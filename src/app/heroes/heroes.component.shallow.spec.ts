import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes: Hero[];

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'Superman', strength: 100 },
      { id: 2, name: 'Aquaman', strength: 50 },
      { id: 3, name: 'WonderWoman', strength: 300 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes).toBe(heroes);
  });
});
