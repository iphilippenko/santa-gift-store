import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Users

.
PageComponent;
}
from;
'./users.page.component';

describe('Users.PageComponent', () => {
    let component: Users.PageComponent;
    let fixture: ComponentFixture<Users.PageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Users.PageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Users.PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
