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
import {DisLikePost} from "../../../models/dis-like-post";
import {SaveService} from "../../../services/save.service";
import {ToartsService} from "../../../services/toarts.service";
import {CommonService} from "../../../services/common.service";

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
  likes?: LikePost[]
  hearts?: IconHeart[]
  disLikes?: DisLikePost[]
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
  detailUser = 'Xem trang c?? nh??n'
  liked = ' ???? th??ch b??i vi???t'
  disLiked = ' kh??ng th??ch b??i vi???t'
  hearted = ' ???? th??? tim b??i vi???t'
  checkLike = false
  checkHeart = false
  checkDisLike = false
  checkConnectInput = false
  checkConnectInput2 = false

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
              private storage: AngularFireStorage,
              private saveService: SaveService,
              private toartsService: ToartsService,
              private commonService: CommonService
  ) {
    localStorage.removeItem('UrlMessage')
    localStorage.setItem('Url', window.location.pathname);
    // @ts-ignore
    this.currentUser = localStorage.getItem("currentUser")
    this.idUser = JSON.parse(this.currentUser).id;
    console.log(this.idUser);
    this.userService.userDetail(this.idUser + "").subscribe(result => {
      this.userDetail = result;
    }, error => {
      console.log("L???i: " + error)
    });
    this.shortNewService.newDay().subscribe()
    this.allPeople()
    this.allCommentUpdated()
    this.allPostPublic()
  }

  ngOnInit(): void {
    this.getListFriends(this.idUserLogIn)
    this.allAnswerComment()
    this.allFriend(this.idUserLogIn)
  }

  allPostPublic() {
    console.log("v??o h??m allPostPublic")
    this.postService.allPostPublic("").subscribe(result => {
      this.posts = result
    }, error => {
      console.log("L???i: " + error)
    })
  }

  updateLikePost(idPost: any) {
    console.log("v??o h??m updateLikePost")
    this.postService.updateLikePost(idPost).subscribe(() => {
      this.allPostPublic()
    })
  }

  updateDisLikePost(idPost: any) {
    console.log("v??o h??m updateDisLikePost")
    this.postService.updateDisLikePost(idPost).subscribe(() => {
      this.allPostPublic()
    })
  }

  updateHeartPost(idPost: any) {
    console.log("v??o h??m updateHeartPost")
    this.postService.updateHeartPost(idPost).subscribe(() => {
      this.allPostPublic()
    })
  }

  // T???o, x??a like
  createLike(idPost: any) {
    console.log("v??o h??m createLike")
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
    this.likePostService.createLike(likePost, idPost, this.idUser).subscribe(() => {
      this.updateLikePost(idPost)
    }, error => {
      if (error.status == 200) {
        this.updateLikePost(idPost)
      }
      console.log("L???i: " + error)
    })
  }

  // T???o, x??a dislike
  createDisLike(idPost: any) {
    console.log("v??o h??m createDisLike")
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
    this.likePostService.createDisLike(disLikePost, idPost, this.idUser).subscribe(() => {
      this.updateDisLikePost(idPost)
    }, error => {
      if (error.status == 200) {
        this.updateDisLikePost(idPost)
      }
      console.log("L???i: " + error)
    })
  }

  // T???o, x??a th??? tim
  createHeart(idPost: any) {
    console.log("v??o h??m createHeart")
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
    this.likePostService.createHeart(heart, idPost, this.idUser).subscribe(() => {
      this.updateHeartPost(idPost)
    }, error => {
      if (error.status == 200) {
        this.updateHeartPost(idPost)
      }
      console.log("L???i: " + error)
    })
  }

  // T???o post
  createPost(idUser: any) {
    console.log("v??o h??m createPost")
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
      // @ts-ignore
      document.getElementById('value').value = "";
      this.post = result
      this.allPostPublic()
      this.fb = null
    }, error => {
      console.log("L???i: " + error)
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

  // Hi???n th??? 12 ng?????i b??n ph???i (g???i ?? k???t b???n)
  allPeople() {
    this.friendRelationService.friendSuggestion(this.idUser).subscribe(result => {
      this.users = result
    }, error => {
      console.log("L???i: " + error)
    })
  }

  // Hi???n th??? t???t c??? comment c???a b??i vi???t
  allComment() {
    console.log("v??o h??m allComment")
    this.commentService.allComment().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("L???i: " + error)
    })
  }

  allCommentUpdated() {
    console.log("v??o h??m allCommentUpdated")
    this.commentService.allCommentUpdated().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("L???i: " + error)
    })
  }

  // T???o comment
  createComment(idPost: any) {
    console.log("v??o h??m createComment")
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
      console.log("???? v??o")
      // @ts-ignore
      document.getElementById('ip2').value = "";
      // @ts-ignore
      this.commentOne = rs
      this.allPostPublic()
      this.allComment()
      console.log("???? v??o" + rs)
    }, error => {
      console.log("L???i: " + error)
    })
  }

  createLikeComment(idComment: any) {
    console.log("v??o h??m createLikeComment")
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
    this.likeCommentService.createLikeComment(commentLike, idComment, this.idUser).subscribe(() => {
      this.allCommentUpdated()
    }, error => {
      if (error.status == 200) {
        this.allCommentUpdated()
      }
      console.log("L???i: " + error)
    })
  }

  createDisLikeComment(idComment: any) {
    console.log("v??o h??m createDisLikeComment")
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
    this.likeCommentService.createDisLikeComment(dislikeComment, idComment, this.idUser).subscribe(() => {
      this.allCommentUpdated()
    }, error => {
      if (error.status == 200) {
        this.allCommentUpdated()
      }
      console.log("L???i: " + error)
    })
  }

  getListFriends(idUser: any) {
    console.log("V??o h??m getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.friendRelations = rs
    })
  }

  allAnswerComment() {
    console.log("V??o h??m allAnswerComment")
    this.answerCommentService.getAll().subscribe(rs => {
      this.answerComments = rs
    })
  }

  createAnswerComment(idComment: any) {
    console.log("v??o h??m createAnswerComment")
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
      console.log("???? v??o")
      // @ts-ignore
      document.getElementById('ip3').value = "";
      // @ts-ignore
      this.commentOne = rs
      this.ngOnInit()
    }, error => {
      console.log("L???i: " + error)
    })
  }

  allFriend(idUser: any) {
    console.log("V??o h??m getListFriends" + idUser)
    this.friendRelationService.listFriend(idUser).subscribe(rs => {
      this.friendRelations2 = rs
      this.countFriend = rs.length
    })
  }

  deleteComment(idComment: any, idPost: any) {
    console.log("idComment l??: " + idComment);
    this.commentService.deleteComment(this.idUserLogIn, idComment, idPost).subscribe(() => {
      this.allPostPublic()
      this.allComment()
    }, error => {
      console.log(error)
      if (error.status == 200) {
        this.allPostPublic()
        this.allComment()
      }
    })
  }

  deleteAnswerComment(idComment: any, idAnswerComment: any) {
    console.log("idComment l??: " + idComment);
    console.log("idAnswerComment l??: " + idAnswerComment);
    this.answerCommentService.deleteAnswerComment(this.idUserLogIn, idComment, idAnswerComment).subscribe(() => {
      this.allPostPublic()
      this.allComment()
      this.allAnswerComment()
    }, error => {
      console.log(error)
      if (error.status == 200) {
        this.allPostPublic()
        this.allComment()
        this.allAnswerComment()
      }
    })
  }

  getAllLike(idUser: any) {
    this.likePostService.getAllLike(idUser).subscribe(rs => {
      console.log("checkLike" + rs.length)
      this.likes = rs
      if (rs.length > 0) {
        this.checkLike = true
      }
      if (rs.length == 0) {
        this.checkLike = false
      }
    })
  }

  getAllHeart(idUser: any) {
    this.likePostService.getAllHeart(idUser).subscribe(rs => {
      console.log("checkHeart" + rs.length)
      this.hearts = rs
      if (rs.length > 0) {
        this.checkHeart = true
      }
      if (rs.length == 0) {
        this.checkHeart = false
      }
    })
  }

  getAllDisLike(idUser: any) {
    this.likePostService.getAllDisLike(idUser).subscribe(rs => {
      this.disLikes = rs
      console.log("checkDisLike" + rs.length)
      if (rs.length > 0) {
        this.checkDisLike = true
      }
      if (rs.length == 0) {
        this.checkDisLike = false
      }
    })
  }

  connectInput() {
    this.checkConnectInput = true
  }

  connectInput2() {
    this.checkConnectInput2 = true
  }

  leaveInput() {
    // @ts-ignore
    let value = document.getElementById('value').value
    this.checkConnectInput = value.length > 0;
  }

  leaveInput2() {
    // @ts-ignore
    let value = document.getElementById('value').value
    this.checkConnectInput2 = value.length > 0;
  }

  savePost(idPost: any) {
    console.log("v??o h??m savePost")
    this.saveService.savePost(idPost, this.idUserLogIn).subscribe(() => {
      this.toartsService.openToartsSavePost('save')
    }, error => {
      this.toartsService.openToartsSavePost('duplicate')
    })
  }

  ngOnDestroy() {
    localStorage.removeItem('Url')
    localStorage.removeItem('UrlMessage')
    localStorage.removeItem('UrlUserDetail')
    localStorage.removeItem('UrlShortNew')
    localStorage.removeItem('UrlBlackList')
    localStorage.removeItem('UrlGroupByUser')
  }
}
