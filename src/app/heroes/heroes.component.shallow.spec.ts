import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes: Hero[];

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class MockHeroComponent {
    @Input() hero: Hero;
  }

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
      declarations: [HeroesComponent, MockHeroComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes).toBe(heroes);
  });
});
