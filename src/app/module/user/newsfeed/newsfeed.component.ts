import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {Router} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../models/comment";
import {FormControl, FormGroup} from "@angular/forms";
import {IconHeart} from "../../../models/icon-heart";
import {LikeCommentService} from "../../../services/like-comment.service";
import {FriendRelation} from "../../../models/friend-relation";
import {AnswerCommentService} from "../../../services/answer-comment.service";
import {AnswerComment} from "../../../models/answer-comment";
import {Post2} from "../../../models/post2";
import {ShortNewService} from "../../../services/short-new.service";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LikePost} from "../../../models/like-post";
import {LikePostService} from "../../../services/like-post.service";

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit, OnDestroy {

  currentUser: string = "";
  idUser: string | undefined;
  idUserLogIn = localStorage.getItem("USERID")
  userDetail!: User;
  users!: User[];
  posts?: Post2[]
  post?: Post2
  like?: LikePost[]
  comment?: Comment[]
  commentOne?: Comment
  heart?: IconHeart
  friendRelations?: FriendRelation[];
  friendRelations2?: FriendRelation[];
  countFriend?: any
  answerComments?: AnswerComment[]
  checkDone = false
  checkButton = true
  check = true
  menu: any
  fb: any;
  downloadURL!: Observable<string>;
  detailUser = 'Xem trang cá nhân'

  commentCreateForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  answerCommentsForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  newPostForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  constructor(private userService: UserService,
              private friendRelationService: FriendRelationService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private likeCommentService: LikeCommentService,
              private answerCommentService: AnswerCommentService,
              private router: Router,
              private postService: PostService,
              private shortNewService: ShortNewService,
              private storage: AngularFireStorage
  ) {
    // @ts-ignore
    this.currentUser = localStorage.getItem("currentUser")
    this.idUser = JSON.parse(this.currentUser).id;
    console.log(this.idUser);
    this.userService.userDetail(this.idUser + "").subscribe(result => {
      this.userDetail = result;
      console.log("User: " + result);
    }, error => {
      console.log("Lỗi: " + error)
    });
    this.shortNewService.newDay().subscribe()
    this.allPeople()
    this.allComment()
    this.reloadAllPostPublic()
  }

  ngOnInit(): void {
    localStorage.removeItem('UrlMessage')
    localStorage.setItem('Url', window.location.href);
    this.getListFriends(this.idUserLogIn)
    this.allAnswerComment()
    this.allFriend(this.idUserLogIn)
  }

  // Tất cả post
  allPostPublic() {
    console.log("vào hàm allPostPublic")
    this.postService.allPost().subscribe(result => {
      this.posts = result
      // console.log("Kiểu dữ liệu: " + JSON.stringify(result))
      this.reloadComment()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  reloadAllPostPublic() {
    console.log("vào hàm reloadAllPostPublic")
    this.postService.reloadAllPostPublic().subscribe(result => {
      this.posts = result
      this.reloadComment()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  updateLikePost(idPost: any) {
    console.log("vào hàm updateReflectPost")
    this.postService.updateLikePost(idPost).subscribe(result => {
      this.reloadAllPostPublic()
    })
  }

  updateDisLikePost(idPost: any) {
    console.log("vào hàm updateDisLikePost")
    this.postService.updateDisLikePost(idPost).subscribe(result => {
      this.reloadAllPostPublic()
    })
  }

  updateHeartPost(idPost: any) {
    console.log("vào hàm updateHeartPost")
    this.postService.updateHeartPost(idPost).subscribe(result => {
      this.reloadAllPostPublic()
    })
  }

  // Tạo, xóa like
  createLike(idPost: any) {
    console.log("vào hàm createLike")
    const likePost = {
      userLike: {
        id: this.idUser
      },
      post: {
        id: idPost
      },
    }
    console.log(likePost)
    // @ts-ignore
    this.likePostService.createLike(likePost, idPost, this.idUser).subscribe(result => {
      this.updateLikePost(idPost)
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo, xóa dislike
  createDisLike(idPost: any) {
    console.log("vào hàm createDisLike")
    const disLikePost = {
      userLike: {
        id: this.idUser
      },
      post: {
        id: idPost
      },
    }
    console.log(disLikePost)
    // @ts-ignore
    this.likePostService.createDisLike(disLikePost, idPost, this.idUser).subscribe(result => {
      this.updateDisLikePost(idPost)
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo, xóa thả tim
  createHeart(idPost: any) {
    console.log("vào hàm createHeart")
    const heart = {
      userLike: {
        id: this.idUser
      },
      post: {
        id: idPost
      },
    }
    console.log(heart)
    // @ts-ignore
    this.likePostService.createHeart(heart, idPost, this.idUser).subscribe(result => {
      this.updateHeartPost(idPost)
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo post
  createPost(idUser: any) {
    console.log("vào hàm createPost")
    const newPost = {
      content: this.newPostForm.value.content,
      image: this.fb,
      user: {
        id: this.idUser
      },
    }
    console.log(newPost)
    // @ts-ignore
    this.postService.createPost(newPost, idUser).subscribe(result => {
      this.post = result
      this.reloadAllPostPublic()
      this.fb = null
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  onFileSelected(event: any) {
    this.checkDone = true
    this.checkButton = false
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            this.checkDone = false
            this.checkButton = true
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  // Hiển thị 12 người bên phải (gợi ý kết bạn)
  allPeople() {
    this.friendRelationService.friendSuggestion(this.idUser).subscribe(result => {
      this.users = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Hiển thị tất cả comment của bài viết
  allComment() {
    console.log("vào hàm allComment")
    this.commentService.getAll().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  reloadComment() {
    console.log("vào hàm reloadComment")
    this.commentService.reloadComment().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  reloadLikeAllComment() {
    console.log("vào hàm reloadLikeAllComment")
    this.commentService.reloadLikeAllComment().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  reloadDisLikeAllComment() {
    console.log("vào hàm reloadDisLikeAllComment")
    this.commentService.reloadDisLikeAllComment().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  // Tạo comment
  createComment(idPost: any) {
    console.log("vào hàm createComment")
    const comment = {
      content: this.commentCreateForm.value.content,
      user: {
        id: this.idUser
      },
      post: {
        id: idPost
      }
    }
    // @ts-ignore
    this.commentService.createComment(comment, this.idUser, idPost).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      this.commentOne = rs
      this.reloadAllPostPublic()
      console.log("Đã vào" + rs)
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  createLikeComment(idComment: any) {
    console.log("vào hàm createLikeComment")
    const commentLike = {
      userLike: {
        id: this.idUser
      },
      comment: {
        id: idComment
      },
    }
    console.log(commentLike)
    // @ts-ignore
    this.likeCommentService.createLikeComment(commentLike, idComment, this.idUser).subscribe(rs => {
      this.reloadLikeAllComment()
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.reloadLikeAllComment()
  }

  createDisLikeComment(idComment: any) {
    console.log("vào hàm createDisLikeComment")
    const dislikeComment = {
      userLike: {
        id: this.idUser
      },
      comment: {
        id: idComment
      },
    }
    console.log(dislikeComment)
    // @ts-ignore
    this.likeCommentService.createDisLikeComment(dislikeComment, idComment, this.idUser).subscribe(rs => {
      this.reloadDisLikeAllComment()
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.reloadDisLikeAllComment()
  }

  getListFriends(idUser: any) {
    console.log("Vào hàm getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.friendRelations = rs
    })
  }

  allAnswerComment() {
    console.log("Vào hàm allAnswerComment")
    this.answerCommentService.getAll().subscribe(rs => {
      this.answerComments = rs
    })
  }

  createAnswerComment(idComment: any) {
    console.log("vào hàm createAnswerComment")
    const answerComment = {
      content: this.answerCommentsForm.value.content,
      user: {
        id: this.idUser
      },
      comment: {
        id: idComment
      }
    }
    // @ts-ignore
    this.answerCommentService.save(answerComment, this.idUser, idComment).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      this.commentOne = rs
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  allFriend(idUser: any) {
    console.log("Vào hàm getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.friendRelations2 = rs
      this.countFriend = rs.length
    })
  }

  deleteComment(idComment: any, idPost: any) {
    console.log("idComment là: " + idComment);
    this.commentService.deleteComment(this.idUserLogIn, idComment, idPost).subscribe(rs => {
      this.reloadAllPostPublic()
    }, error => {
      console.log(error)
    })
  }

  ngOnDestroy() {
    console.log('ChildComponent:OnDestroy');
    localStorage.removeItem('Url')
    localStorage.removeItem('UrlMessage')
    localStorage.removeItem('UrlUserDetail')
    localStorage.removeItem('UrlShortNew')
  }
}
