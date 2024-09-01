import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow integration)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = { id: 1, name: 'Superman', strength: 200 };
    fixture.detectChanges();
  });

  it('should have the correct hero', () => {
    expect(fixture.componentInstance.hero.name).toEqual('Superman');
  });

  it('should render the hero name in an anchor tag (using nativeElement)', () => {
    expect(fixture.nativeElement.querySelector('a').textContent).toContain(
      'Superman'
    );
  });

  it('should render the hero name in an anchor tag (using debugElement)', () => {
    let debugElementAnchor = fixture.debugElement.query(By.css('a'));

    expect(debugElementAnchor.nativeElement.textContent).toContain('Superman');
  });
});
