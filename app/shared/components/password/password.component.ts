import {
  Component,
  Input,
  forwardRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Injector,
  AfterViewInit
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ValidationErrors,
  AbstractControl,
  Validators,
  FormControl,
  NgControl
} from "@angular/forms";

@Component({
  selector: "loxam-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent
  implements ControlValueAccessor, OnChanges, AfterViewInit {
  @Input() name: string = "password";
  @Input() friendlyName: string = this.name;
  @Input() placeholder: string = "";
  @Input() disabled: boolean = false;
  @Input() maxlength: number = 100;
  @Input() regex: string = "";
  @Input() showObscurityToggle: boolean = true;
  @Input() obscurred: boolean = true;
  @Output() onObscurityChanged: EventEmitter<boolean> = new EventEmitter();

  private control: FormControl;
  public value: string;
  private passwordObscurred: boolean;

  constructor(private injector: Injector) {
    this.passwordObscurred = true;
  }

  // Implement ngAfterViewInit interface
  // ========================================

  public ngAfterViewInit(): void {
    // Get the FormControl for this password control
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (!ngControl) return;

    this.control = ngControl.control as FormControl;
  }

  // Implement ControlValueAccessor interface
  // ========================================

  public writeValue(newValue: any): void {
    if (newValue === undefined) return;

    this.value = newValue;
    this.propagateChange(this.value);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: () => void): void {}

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Implement OnChanges interface
  // =============================

  public ngOnChanges(changes: SimpleChanges): void {
    // The only input that we are watching is the obscurred boolean flag,
    // so that the password / plain - text can be flipped externally to the control
    // i.e. so that a single show/hide icon can control the password obscurity of several password controls.
    if (!changes["obscurred"]) return;

    const obscurityChanges = changes["obscurred"];
    this.setPasswordObscurity(obscurityChanges.currentValue);
  }

  // Impliment validation interface
  // ==============================

  public validate(ctrl: AbstractControl): ValidationErrors | null {
    // Oddly enough, a custom form control built with ControlValueAccessor does not
    // update the parent form with it validity status.  Use NG_VALIDATORS to do it here.
    return Validators.compose([Validators.required, Validators.minLength(6)])(
      ctrl
    );
  }

  // PasswordComponent public functions
  // ==================================

  public onChangeEvent(event: any) {
    this.propagateChange(event.target.value);
  }

  public onPasswordObscurityClick(): void {
    this.setPasswordObscurity(!this.passwordObscurred);
  }

  public getInputType(): string {
    return this.passwordObscurred ? "password" : "text";
  }

  public getIconName(): string {
    return this.passwordObscurred ? "visibility_off" : "visibility";
  }

  public hasError(errorName: string): boolean {
    if (!this.control) return false;
    return this.control.hasError(errorName);
  }

  // PasswordComponent private functions
  // ===================================

  private propagateChange = (_: any) => {};

  private setPasswordObscurity(state: boolean): void {
    this.passwordObscurred = state;

    // Expose password obscurred/visible change event to parent
    this.onObscurityChanged.emit(this.passwordObscurred);
  }
}
