import {AppController} from './app.controller';
import {AuthService} from './auth/auth.service';
import {AppService} from './app.service';


describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;
    let authService: AuthService;

    beforeEach(() => {
        appService = new AppService();
        appController = new AppController(
            authService,
            appService
        );
    });

    describe('hello', () => {
        it('should return an string hello',  () => {
            const result = 'hello';
            jest.spyOn(appService, 'getHello').mockImplementation(() => result);

            expect(appController.hello()).toBe(result);
        });
    });
});
