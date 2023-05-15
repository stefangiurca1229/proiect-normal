import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { map, take } from 'rxjs';
import { AddNewGroupService } from './add-new-group.service';

@Component({
  selector: 'app-add-new-group',
  templateUrl: './add-new-group.page.html',
  styleUrls: ['./add-new-group.page.scss'],
})
export class AddNewGroupPage implements OnInit {

  public myForm: FormGroup;
  public userNotExist: Boolean = false
  public toasts: HTMLIonToastElement[] = []
  private validUsers: number = 0

  constructor(
    private fb: FormBuilder,
    private addNewGroupService: AddNewGroupService,
    private toastController: ToastController
  ) {
    this.myForm = this.fb.group({
      groupName: ["", Validators.required],
      inputs: fb.array([this.createInput()])
    });
  }

  ngOnInit() {
  }

  get groupName() {
    return this.myForm.get('groupName') as FormControl
  }

  get inputs() {
    return this.myForm.get('inputs') as FormArray;
  }

  createInput(): FormControl {
    return this.fb.control("", [Validators.required, Validators.email]);
  }

  addNewUser() {
    this.inputs.push(this.createInput())
  }

  private createToast(message: string){
    this.toastController.create({
      message: message,
      duration: 5000
    }).then(
      toast => {
        toast.present();
      }
    )
  }

  private createGroup(){
      return this.addNewGroupService.createNewGroup(this.groupName.value)
      .pipe(map(
        (groupAllreadyExists) => {
          if (groupAllreadyExists) {
            this.groupName.setErrors({ invalidInput: true })
            this.createToast(`this group name allready exist`)
            this.validUsers = 0
          }
          return groupAllreadyExists 
        }
      ))
  }

  private addUser(){
    this.createGroup()
    .pipe(take(1))
    .subscribe(
      (groupAllreadyExists) =>{
        if(!groupAllreadyExists){
          this.validUsers = 0
          for(let user of this.inputs.controls){
            console.log(user.value)
            this.addNewGroupService.usersQueue.next({
              email: user.value,
              groupName: this.groupName.value
            })
          }
        }
      }
    )
  }

  submit() {
    this.inputs.controls.forEach(input => {
      this.addNewGroupService.checkIfEmailIsValid(input.value)
                          .pipe(take(1))
                          .subscribe(
                            emailExist =>{
                              if(emailExist)
                                this.validUsers++
                              else{
                                this.createToast("some provided emails dose not exist")
                                input.setErrors({ invalidInput: true})
                                this.validUsers = 0
                              }
                              console.log(this.inputs.length, this.validUsers)
                              if(this.inputs.length == this.validUsers){
                                this.addUser()
                              }
                            }
                          )
    });
  }

}
