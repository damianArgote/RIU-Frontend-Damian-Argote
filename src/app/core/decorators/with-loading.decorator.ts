
interface HasLoadingService {
  loadingService: {
    show: () => void;
    hide: () => void;
  };
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function delayPromise(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function WithLoading() {
  return function (
    _: unknown,
    __: string,
    descriptor: PropertyDescriptor
  ) {

    const originalMethod = descriptor.value;
    
    descriptor.value = async function (this: HasLoadingService,...args: any[]) {
      const loadingService = this.loadingService;

      if (!loadingService || typeof loadingService.show !== 'function') {
        throw new Error(
          '@WithLoading: La instancia que usa este decorador debe tener una propiedad "loadingService"'
        );
      }

      loadingService.show();

      try {
        await delayPromise(50);
        const result = originalMethod.apply(this, args);
        return delay(1500).then(() => {
          loadingService.hide();
          return result;
        });
      } catch (error) {
        throw error;
      }
    };

    return descriptor;
  };
}
