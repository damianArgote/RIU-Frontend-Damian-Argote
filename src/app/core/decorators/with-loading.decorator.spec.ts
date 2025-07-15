import { WithLoading } from './with-loading.decorator';

describe('WithLoading Decorator', () => {
  let instance: any;

  class TestClass {
    loadingService = {
      show: () => {},
      hide: () => {},
    };

    @WithLoading()
    async testMethod(arg: string) {
      return `Hello ${arg}`;
    }
  }

  beforeEach(() => {
    instance = new TestClass();
    spyOn(instance.loadingService, 'show');
    spyOn(instance.loadingService, 'hide');
  });

  it('should call show and hide on loadingService', async () => {
    const result = await instance.testMethod('World');
    expect(instance.loadingService.show).toHaveBeenCalled();
    expect(instance.loadingService.hide).toHaveBeenCalled();
    expect(result).toBe('Hello World');
  });

  it('should throw error if loadingService is missing', async () => {
    class NoLoadingService {
      @WithLoading()
      async testMethod() {
        return 'fail';
      }
    }
    const noServiceInstance = new NoLoadingService();
    await expectAsync(noServiceInstance.testMethod()).toBeRejectedWith(
      jasmine.stringMatching(/La instancia que usa este decorador debe tener una propiedad "loadingService"/)
    );
  });

  it('should throw error if loadingService.show is not a function', async () => {
    class InvalidLoadingService {
      loadingService = { show: null, hide: () => {} };
      @WithLoading()
      async testMethod() {
        return 'fail';
      }
    }
    const invalidInstance = new InvalidLoadingService();
    await expectAsync(invalidInstance.testMethod()).toBeRejectedWith(
      jasmine.stringMatching(/La instancia que usa este decorador debe tener una propiedad "loadingService"/)
    );
  });
});