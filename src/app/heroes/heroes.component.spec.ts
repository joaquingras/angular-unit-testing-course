import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let heroesComponent: HeroesComponent;
  let heroes: Hero[] = [];
  let mockHeroService;

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'Superman', strength: 30 },
      { id: 2, name: 'Wonder Woman', strength: 40 },
      { id: 3, name: 'Batman', strength: 20 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    mockHeroService.deleteHero.and.returnValue(of(true));

    heroesComponent = new HeroesComponent(mockHeroService);
    heroesComponent.heroes = heroes;
  });

  it('should remove the indicated hero from the list', () => {
    const hero = heroes[1];

    heroesComponent.delete(hero);

    expect(heroesComponent.heroes.length).toBe(2);
  });

  it('should call deleteHero on the service', () => {
    const hero = heroes[1];

    heroesComponent.delete(hero);

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(hero);
  });


});
