import { mockLogging } from '@jupiterone/platform-sdk-logging/src/test';


mockLogging({
  enableLogging: false,
});

afterEach(jest.resetAllMocks);
