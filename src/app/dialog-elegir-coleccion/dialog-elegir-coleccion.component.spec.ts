import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DialogElegirColeccionComponent } from './dialog-elegir-coleccion.component';

describe('DialogElegirColeccionComponent', () => {
  let component: DialogElegirColeccionComponent;
  let fixture: ComponentFixture<DialogElegirColeccionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogElegirColeccionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogElegirColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
