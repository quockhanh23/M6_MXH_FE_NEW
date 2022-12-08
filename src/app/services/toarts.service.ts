import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToartsService {

  title = 'Thông báo'

  constructor(private toarts: ToastrService,) {
  }

  openToartsSendRequestFriendSuccess() {
    this.toarts.success('Gửi lời kết bạn mời thành công', this.title)
  }

  openToartsCancelRequestFriend() {
    this.toarts.info('Bạn đã hủy yêu cầu kết bạn', this.title)
  }

  openToartsUnFriend() {
    this.toarts.info('Bạn đã hủy kết bạn thành công', this.title)
  }

  openToartsShortNewCreateSuccess() {
    this.toarts.success('Tạo tin thành công', this.title)
  }

  openToartsChangeImage(type: any) {
    if (type == 'Avatar') this.toarts.success('Đổi ảnh đại diện thành công', this.title)
    if (type == 'Cover') this.toarts.success('Đổi ảnh nền thành công', this.title)
  }
}
