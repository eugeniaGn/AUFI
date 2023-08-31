import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DialogCrearColeccionComponent } from './dialog-crear-coleccion.component';

describe('DialogCrearColeccionComponent', () => {
  let component: DialogCrearColeccionComponent;
  let fixture: ComponentFixture<DialogCrearColeccionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCrearColeccionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCrearColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
