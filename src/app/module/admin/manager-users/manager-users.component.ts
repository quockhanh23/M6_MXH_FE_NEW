import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {UserDTO} from "../../../models/user-dto";

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {

  userDTOList?: UserDTO[]
  count?: any

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {
    console.log("vào hàm getAllUser")
    this.adminService.getAllUser().subscribe(rs => {
      this.userDTOList = rs
      this.count = rs.length
    })
  }
}
