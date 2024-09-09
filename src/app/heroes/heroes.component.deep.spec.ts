import { Hero } from '../hero';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (deep tests)', () => {
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
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    heroComponentDEs.forEach((heroComponentDE, index) => {
      expect(heroComponentDE.componentInstance.hero).toEqual(heroes[index]);
    });
  });

  it(`should call delete on Heroes component when the delete button is clicked
    on the Hero Component`, () => {
    spyOn(fixture.componentInstance, 'delete');

    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    heroComponentDEs.forEach((heroComponentDE, index) => {
      heroComponentDE
        .query(By.css('button'))
        .triggerEventHandler('click', { stopPropagation: () => {} });
      // (<HeroComponent>heroComponentDE.componentInstance).delete.emit(null)
      // heroComponentDE.triggerEventHandler('delete', null);

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(
        heroes[index]
      );
    });
  });
});
