import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {FriendRelation} from "../../../models/friend-relation";
import {ImageService} from "../../../services/image.service";
import {PostService} from "../../../services/post.service";
import {Post2} from "../../../models/post2";
import {Comment} from "../../../models/comment";
import {DisLikePost} from "../../../models/dis-like-post";
import {IconHeart} from "../../../models/icon-heart";
import {AnswerComment} from "../../../models/answer-comment";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../../services/comment.service";
import {LikeCommentService} from "../../../services/like-comment.service";
import {AnswerCommentService} from "../../../services/answer-comment.service";
import {LikePost} from "../../../models/like-post";
import {LikePostService} from "../../../services/like-post.service";
import {ToartsService} from "../../../services/toarts.service";
import {FollowWatchingService} from "../../../services/follow-watching.service";
import {MatDialog} from "@angular/material/dialog";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  urlMessage = localStorage.getItem("UrlMessage")
  urlBlackList = localStorage.getItem("UrlBlackList")
  url = localStorage.getItem("Url")
  friendRelations?: any;
  friend?: FriendRelation;
  user?: User[];
  userFollow?: User;
  userDetail?: User
  post?: Post2[]
  countFriend? = 0
  countImage? = 0
  noInfo = 'Không có thông tin'
  currentUser: string = "";
  idUser: string | undefined;
  users!: User[];
  like?: LikePost[]
  likePost?: LikePost
  comment?: Comment[]
  commentOne?: Comment
  disLikePost?: DisLikePost
  heart?: IconHeart
  answerComments?: AnswerComment[]
  check = true
  checkUser2 = false
  checkAlreadyFriend = false
  checkAcceptFriend = false
  checkRemoveFriend = true
  menu: any
  size: any
  avatarUserLogin?: any
  countMutualFriends = 0
  checkConnectInput = false
  heightLine = "height: 50px";

  commentCreateForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  answerCommentsForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  constructor(private router: Router,
              private userService: UserService,
              private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private friendRelationService: FriendRelationService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private likeCommentService: LikeCommentService,
              private answerCommentService: AnswerCommentService,
              private followWatchingService: FollowWatchingService,
              private toarts: ToartsService,
              private commonService: CommonService,
              public dialog: MatDialog,
  ) {
    localStorage.setItem('Url', window.location.pathname);
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id: any = paramMap.get('id');
      console.log("id user: " + id)
      this.idUser = id
      this.userService.userDetail(id).subscribe(result => {
        this.userDetail = result
      }, error => {
        this.router.navigate(['user/newsfeed']).then()
        this.commonService.dialogCommon(error)
      })
      this.userService.userDetail(this.idUserLogIn).subscribe(result => {
        this.avatarUserLogin = result.avatar
      })
      this.imageService.allImageOfUser(id).subscribe(result => {
        try {
          this.countImage = result.length
        } catch (err) {
          console.log("lỗi length")
        }
      })
      this.friendRelationService.agree(this.idUserLogIn, id).subscribe(rs => {
        try {
          if (rs.length > 0) {
            this.checkUser2 = true;
          }
        } catch (err) {
          console.log("lỗi length")
        }
      })
    })
    this.allPostPublic()
    this.allComment()
    this.getOne(this.idUser)
    this.allAnswerComment()
    this.checkLine()
  }

  ngOnInit(): void {
    this.listRequest()
    this.friendCheck()
    this.friendList()
    this.mutualFriends()
  }

  allPostPublic() {
    console.log("vào hàm allPostPublic")
    this.postService.allPostPublic(<string>this.idUser).subscribe(result => {
      this.post = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  friendList() {
    this.friendRelationService.listFriend(this.idUser).subscribe(result => {
      console.log("rs: " + this.checkAcceptFriend)
      this.friendRelations = result
      try {
        this.countFriend = result.length
      } catch (err) {
        console.log("lỗi length")
      }
      for (let i = 0; i < this.friendRelations.length; i++) {
        // console.log("Kiểu dữ liệu: " + JSON.stringify(this.friendRelations[i]))
        if (this.friendRelations[i].id == this.idUserLogIn) {
          this.checkAcceptFriend = true;
        }
      }
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  friendCheck() {
    this.friendRelationService.friend(this.idUserLogIn, this.idUser).subscribe(rs => {
      try {
        if (rs.length > 0) {
          this.checkAcceptFriend = true;
          console.log("checkAcceptFriend:" + this.checkAcceptFriend)
        }
      } catch (err) {
        console.log("lỗi length")
      }
    })
  }

  createLike(idPost: any) {
    console.log("vào hàm createLike")
    const likePost = {
      userLike: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      },
    }
    console.log(likePost)
    // @ts-ignore
    this.likePostService.createLike(likePost, idPost, this.idUserLogIn).subscribe(result => {
      this.likePost = result
      this.allPostPublic()
    }, error => {
      console.log("Lỗi: " + error)
      this.allPostPublic()
    })
  }

  createDisLike(idPost: any) {
    console.log("vào hàm createDisLike")
    const disLikePost = {
      userLike: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      },
    }
    console.log(disLikePost)
    // @ts-ignore
    this.likePostService.createDisLike(disLikePost, idPost, this.idUserLogIn).subscribe(result => {
      this.disLikePost = result
      console.log(result)
      this.allPostPublic()
    }, error => {
      console.log("Lỗi: " + error)
      this.allPostPublic()
    })
  }

  createHeart(idPost: any) {
    console.log("vào hàm createHeart")
    const heart = {
      userLike: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      },
    }
    console.log(heart)
    // @ts-ignore
    this.likePostService.createHeart(heart, idPost, this.idUserLogIn).subscribe(result => {
      this.disLikePost = result
      this.allPostPublic()
    }, error => {
      console.log("Lỗi: " + error)
      this.allPostPublic()
    })
  }

  allAnswerComment() {
    console.log("Vào hàm allAnswerComment")
    this.answerCommentService.getAll().subscribe(rs => {
      this.answerComments = rs
    })
  }

  allComment() {
    console.log("vào hàm allComment")
    this.commentService.allComment().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  allCommentUpdated() {
    console.log("vào hàm allCommentUpdated")
    this.commentService.allCommentUpdated().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  createComment(idPost: any) {
    console.log("vào hàm createComment")
    const comment = {
      content: this.commentCreateForm.value.content,
      user: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      }
    }
    // @ts-ignore
    this.commentService.createComment(comment, this.idUserLogIn, idPost).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      document.getElementById('value').value = "";
      // @ts-ignore
      this.commentOne = rs
      this.allComment()
      console.log("Đã vào" + rs)
    }, error => {
      if (error.status == 200) {
        this.allComment()
      }
      console.log("Lỗi: " + error)
    })
  }

  createLikeComment(idComment: any) {
    console.log("vào hàm createLikeComment")
    const commentLike = {
      userLike: {
        id: this.idUserLogIn
      },
      comment: {
        id: idComment
      },
    }
    // @ts-ignore
    this.likeCommentService.createLikeComment(commentLike, idComment, this.idUserLogIn).subscribe(rs => {
      this.disLikePost = rs
      console.log(rs)
      this.allCommentUpdated()
    }, error => {
      if (error.status == 200) {
        this.allCommentUpdated()
      }
      console.log("Lỗi: " + error)
    })
  }

  createDisLikeComment(idComment: any) {
    console.log("vào hàm createDisLikeComment")
    const dislikeComment = {
      userLike: {
        id: this.idUserLogIn
      },
      comment: {
        id: idComment
      },
    }
    // @ts-ignore
    this.likeCommentService.createDisLikeComment(dislikeComment, idComment, this.idUserLogIn).subscribe(rs => {
      this.disLikePost = rs
      this.allCommentUpdated()
    }, error => {
      if (error.status == 200) {
        this.allCommentUpdated()
      }
      console.log("Lỗi: " + error)
    })
  }

  createAnswerComment(idComment: any) {
    console.log("vào hàm createAnswerComment")
    const answerComment = {
      content: this.answerCommentsForm.value.content,
      user: {
        id: this.idUserLogIn
      },
      comment: {
        id: idComment
      }
    }
    // @ts-ignore
    this.answerCommentService.save(answerComment, this.idUserLogIn, idComment).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      document.getElementById('ip1').value = "";
      this.commentOne = rs
      this.allPostPublic()
      this.allAnswerComment()
    }, error => {
      console.log("Lỗi: " + error)
      this.allPostPublic()
      this.allAnswerComment()
    })
  }

  deleteComment(idComment: any, idPost: any) {
    console.log("vào hàm deleteComment")
    console.log("idComment là: " + idComment);
    this.commentService.deleteComment(this.idUserLogIn, idComment, idPost).subscribe(() => {
      this.allPostPublic()
      this.allComment()
    }, error => {
      if (error.status == 200) {
        this.allPostPublic()
        this.allComment()
      }
    })
  }

  deleteAnswerComment(idComment: any, idAnswerComment: any) {
    console.log("vào hàm deleteAnswerComment")
    console.log("idComment là: " + idComment);
    console.log("idAnswerComment là: " + idAnswerComment);
    this.answerCommentService.deleteAnswerComment(this.idUserLogIn, idComment, idAnswerComment).subscribe(() => {
      this.allPostPublic()
      this.allAnswerComment()
    }, error => {
      console.log("Lỗi deleteAnswerComment:" + error)
      if (error.status == 200) {
        this.allPostPublic()
        this.allAnswerComment()
      }
    })
  }

  sendRequestFriend(idFriend: any) {
    console.log("vào hàm sendRequestFriend")
    this.friendRelationService.sendRequestFriend(this.idUserLogIn, idFriend).subscribe(() => {
      this.listRequest()
      this.toarts.openToartsSendRequestFriendSuccess()
    }, error => {
      console.log("Lỗi sendRequestFriend:" + error)
      if (error.status == 200) {
        this.listRequest()
        this.toarts.openToartsSendRequestFriendSuccess()
      }
    })
  }

  listRequest() {
    this.friendRelationService.friendCheck(this.idUserLogIn).subscribe(rs => {
      try {
        for (let i = 0; i < rs.length; i++) {
          if (rs[i].idFriend == this.idUser) {
            this.friend = rs[i]
            this.checkAlreadyFriend = true
            console.log("checkAlreadyFriend = " + this.checkAlreadyFriend)
          }
        }
      } catch (err) {
        console.log("")
      }
    })
  }

  acceptFriend() {
    console.log("vào hàm acceptFriend")
    this.friendRelationService.acceptFriend(this.idUserLogIn, this.idUser).subscribe(() => {
      this.checkAlreadyFriend = false
      this.ngOnInit()
    }, error => {
      console.log("Lỗi acceptFriend:" + error)
    })
  }

  removeFriend() {
    console.log("vào hàm removeFriend")
    this.friendRelationService.deleteFriendRelation(this.idUserLogIn, this.idUser).subscribe(() => {
      this.checkRemoveFriend = false
      this.checkAlreadyFriend = false
      this.checkAcceptFriend = false
      this.toarts.openToartsUnFriend()
    }, error => {
      console.log("Lỗi removeFriend:" + error)
      if (error.status == 200) {
        this.toarts.openToartsUnFriend()
      }
    })
  }

  deleteRequest(idFriend: any) {
    console.log("vào hàm deleteRequest")
    this.friendRelationService.deleteFriendRelation(this.idUserLogIn, idFriend).subscribe(() => {
      this.checkUser2 = false
      this.checkAlreadyFriend = false
      this.toarts.openToartsCancelRequestFriend()
    }, error => {
      console.log("Lỗi deleteRequest:" + error)
      if (error.status == 200) {
        this.toarts.openToartsCancelRequestFriend()
      }
    })
  }

  mutualFriends() {
    this.friendRelationService.mutualFriends(this.idUserLogIn, this.idUser).subscribe(rs => {
      this.countMutualFriends = rs
    }, error => {
      console.log("Lỗi mutualFriends:" + error)
    })
  }

  backToMessage() {
    console.log(this.urlMessage)
    this.router.navigate(['user/messenger']).then(rs => {
      console.log(rs)
    })
  }

  backToRequest() {
    console.log(this.url)
    this.router.navigate(['user/requests']).then(rs => {
      console.log(rs)
    })
  }

  backToBlackList() {
    console.log(this.urlBlackList)
    this.router.navigate(['user/blackList']).then(rs => {
      console.log(rs)
    })
  }

  backToUserDetail() {
    console.log(this.url)
    this.router.navigate(['user/listFriend', this.idUserLogIn]).then(rs => {
      console.log(rs)
    })
  }

  checkUrl() {
    return this.url == '/user/listFriend/' + this.idUserLogIn;
  }

  createFollow(idUserFollow: any) {
    this.followWatchingService.createFollow(this.idUserLogIn, idUserFollow).subscribe(() => {
      this.getOne(idUserFollow)
    }, error => {
      console.log("Lỗi createFollow:" + error)
      if (error.status == 200) {
        this.getOne(idUserFollow)
      }
    })
  }

  unFollow(idUserFollow: any) {
    this.followWatchingService.unFollow(this.idUserLogIn, idUserFollow).subscribe(() => {
      this.getOne(idUserFollow)
    }, error => {
      console.log("Lỗi unFollow:" + error)
      if (error.status == 200) {
        this.getOne(idUserFollow)
      }
    })
  }

  getOne(idUserFollow: any) {
    this.followWatchingService.getOne(this.idUserLogIn, idUserFollow).subscribe(rs => {
      this.userFollow = rs
    })
  }

  connectInput() {
    this.checkConnectInput = this.commonService.connectInput()
  }

  leaveInput() {
    this.checkConnectInput = this.commonService.leaveInput()
  }

  checkLine() {
    let count = 0
    if (this.urlMessage == '/user/messenger') {
      count = count + 1;
    }
    if (this.url == '/user/requests') {
      count = count + 1;
    }
    if (this.url == '/user/listFriend/' + this.idUserLogIn) {
      count = count + 1;
    }
    if (this.urlBlackList == '/user/blackList') {
      count = count + 1;
    }
    console.log("count" + count)
    if (count == 1) {
      this.heightLine = "height: 65px"
    }
    if (count == 2) {
      this.heightLine = "height: 90px"
    }
    if (count == 3) {
      this.heightLine = "height: 120px"
    }
    if (count == 4) {
      this.heightLine = "height: 150px"
    }
  }
}
