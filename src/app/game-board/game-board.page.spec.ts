import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { GameBoardPage } from './game-board.page';

describe('GameBoardPage', () => {
  let component: GameBoardPage;
  let fixture: ComponentFixture<GameBoardPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    fixture = TestBed.createComponent(GameBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
