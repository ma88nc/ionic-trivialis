import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('converts demo date strings to Date objects', () => {
    service.getGameInstance().subscribe(game => {
      expect(game.dateAttempted instanceof Date).toBeTrue();
      expect(Number.isNaN(game.dateAttempted.getTime())).toBeFalse();
    });
  });
});
