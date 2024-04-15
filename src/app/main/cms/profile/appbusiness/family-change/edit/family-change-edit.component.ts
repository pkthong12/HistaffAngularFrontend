import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";

// Service Translate
import { TranslationLoaderService } from "src/app/common/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
// Import the locale files
import { locale as english } from "../i18n/en";
import { locale as vietnam } from "../i18n/vi";
// Globals File
import { Globals } from "src/app/common/globals";
import { Configs } from "src/app/common/configs";
import { Notification } from "src/app/common/notification";
const _ = require("lodash");
import { L10n, setCulture } from "@syncfusion/ej2-base";
import {
  FilterService,
  VirtualScrollService,
  GridComponent,
} from "@syncfusion/ej2-angular-grids";
import { ToolbarItem, ToolbarInterface } from "src/app/_models/index";
import { Employee, Situation, PosPage } from "src/app/_models/app/cms";

import { CoreService } from "src/app/services/core.service";
import { ConfigService } from "src/app/services/config.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ModalService } from "src/app/services/modal.service";
import { Query, Predicate } from "@syncfusion/ej2-data";
import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
import * as moment from "moment";
const $ = require("jquery");
const async = require("async");
setCulture("en");

@Component({
  selector: "cms-profile-family-change-edit",
  templateUrl: "./family-change-edit.component.html",
  styleUrls: ["./family-change-edit.component.scss"],
  providers: [FilterService, VirtualScrollService],
  encapsulation: ViewEncapsulation.None,
})
export class FamilyChangeEditComponent implements OnInit {
  toolItems$ = new BehaviorSubject<any[]>([
    
  ])

  // Varriable Language
  flagState$ = new BehaviorSubject<string>('')
  // flag show popup toolbar Back
  flagePopup = true;
  flagView = "profile";
  paramId = "";
  dataHistory = [];
  model: Employee = new Employee();
  // modelTemp: Employee = new Employee();

  situation: Situation = new Situation();
  posPage: PosPage = new PosPage();
  // View child Grid
  // @ViewChild("overviewgridPage", { static: false })
  @ViewChild("overviewgrid", { static: false })
  public gridInstance!: GridComponent;
  languages: any;
  selectedLanguage: any;
  mode: any;
  editForm!: FormGroup;
  removeId: any;
  public query = new Query();
  public fields: FieldSettingsModel = { value: "id", text: "name" };

  // Toolbar Item
  public toolbar!: ToolbarInterface[];

  // Private
  private _unsubscribeAll: Subject<any>;
  lstOrgId: any = [];
  lstPositionId: any = [];
  lstDirectManagerId: any = [];
  lstGenderId: any = [];
  lstReligionId: any = [];
  lstNativeId: any = [];
  lstNationalityId: any = [];
  lstWorkStatusId: any = [];
  lstProvinceId: any = [];
  lstDistrictId: any = [];
  lstWardId: any = [];
  lstCurProvinceId: any = [];
  lstCurDistrictId: any = [];
  lstCurWardId: any = [];
  lstContractId: any = [];
  lstLastWorkingId: any = [];
  lstObjectSalaryId: any = [];
  lstMaritalStatusId: any = [];
  lstBankId: any = [];
  lstBankBranchId: any = [];
  lstSchoolId: any = [];
  lstQualificationId: any = [];
  lstTrainingFormId: any = [];
  lstLearningLevelId: any = [];
  lstEmpSituation: any;
  lstResident: any = [];
  tab: any;
  data: any;
  dataPage: any;
  demo = new Subject();
  /**
   * Constructor
   *
   */
  constructor(
    private _coreService: CoreService,
    private modalService: ModalService,
    private notification: Notification,
    private globals: Globals,
    public configs: Configs,
    public router: Router,
    private _formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    private _configService: ConfigService,
    private _tlaTranslationLoaderService: TranslationLoaderService
  ) {
    // Get Route Param
    this.activatedRoute.params.subscribe((params: Params) => {
      const paramId = params["id"];
      // Nếu trạng thái chỉnh sửa thì Get dữ liệu
      if (paramId !== "new") {
        const objParam = window.atob(paramId);
        const paramUrl = JSON.parse(objParam);
        if (paramUrl && paramUrl.id) {
          this.paramId = paramUrl.id;
          this.flagState$.next(paramUrl.type);
        } else {
          // Xu ly redirect
          this.router.navigate(["/errors/404"]);
        }
      } else {
        this.flagState$.next("new");
      }
    });

    // Set language
    this.languages = this.globals.languages;

    this._configService._configSubject.next("true");
    // Load file language
    this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

    this.editForm = this._formBuilder.group({
      currentinfor: this._formBuilder.group({
        code: [
          { value: null, disabled: false },
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        firstName: [
          "",
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        lastName: [
          "",
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        orgId: ["", [Validators.required]],
        itimeId: ["", []], //Mã chấp công
        orgManager: ["", []], //
        positionId: ["", [Validators.required]], //chức vụ
        taxCode: [[]], //Mã sô thuế
        salTotal: ["", []],
        lstPeriod: [""],
        contractCode: [{ value: null, disabled: true }, []], //Loại hợp đồng
        dateEffect: [{ value: null, disabled: true }, []], //Ngày nghỉ việc
        dateExpire: [{ value: null, disabled: true }, []], //Bảng lương
      }),
      infor: this._formBuilder.group({
        birthDate: ["", []],
        genderId: [""],
        birthPlace: ["", []],
        idNo: ["", []], //CMND
        idDate: [""], //Ngày cấp
        idPlace: ["", []], //Nơi cấp
        passPlace: ["", []],
        nationalityId: ["", []], //Quốc tịch
        nativeId: ["", []], //Dân tộc
        religionId: ["", []], //Tôn giáo
        maritalStatusId: ["", []], //Tình trạng hôn nhân
        resident: [""]
      }),
      address: this._formBuilder.group({
        address: ["", []],
        provinceId: ["", []],
        districtId: ["", []],
        wardId: ["", []],
        directManagerId: ["", []],
        curAddress: [""],
        joinDate: ["", []],
        workStatusId: ["", []],
      }),
      curAddress: this._formBuilder.group({
        curAddress: ["", []],
        curProvinceId: ["", []],
        curDistrictId: ["", []],
        curWardId: ["", []],
      }),
      contact: this._formBuilder.group({
        mobilePhone: ["", []],
        email: ["", []],
        workEmail: ["", []],
        contactPer: ["", []], //Người liên hệ khi cần
        contactPerPhone: ["", []],
      }),
      addinfo: this._formBuilder.group({
        passNo: ["", []], //Hộ chiếu
        passDate: ["", []], //Ngày cấp
        passExpire: ["", []],
        passPlace: ["", []],
        visaNo: ["", []],
        visaDate: ["", []],
        visaExpire: ["", []],
        visaPlace: ["", []],
        workPermit: ["", []], //Giấy phép lao động
        workPermitDate: ["", []],
        workPermitExpire: ["", []],
        workPermitPlace: ["", []],
        workNo: ["", []],
        workDate: ["", []],
        workScope: ["", []],
        workPlace: ["", []],
      }),
      user: this._formBuilder.group({
        bankId: ["", []],
        bankBranch: ["", []],
        bankNo: ["", []],
      }),
      education: this._formBuilder.group({
        schoolId: ["", []],
        qualificationId: ["", []], //Trình độ chuyên môn
        trainingFormId: ["", []], //Hình thức đào tạo
        learningLevelId: ["", []], //trình độ học vấn
        languageMark: ["", []], //điểm số
        language: ["", []], //ngoại ngữ
      }),
      situation: this._formBuilder.group({
        name: ["", []],
        birth: ["", []],
        no: ["", []], // CMND
        taxNo: ["", []], // CMND
        familyNo: ["", []], // CMND
        familyName: ["", []], // CMND
        address: ["", []], // CMND
        relationshipId: ["", []],
        dateStart: ["", []],
        dateEnd: ["", []],
      }),
      page: this._formBuilder.group({
        pageName: ["", []],
        dateInput: ["", []],
        note: ["", []], // CMND
        statusId: ["", []], // CMND
      }),
    });

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    L10n.load(this.configs.languageGrid);
    this.loadData();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
    

    this.flagState$.subscribe(x => {
      let toolbarList: any[] = [];
      if (x === "view") {
        toolbarList = [ToolbarItem.BACK, ToolbarItem.EDIT, ToolbarItem.PRINT];
        this.editForm.disable();
      }
      if (x === "new") {
        toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
      }
      if (x === "edit") {
        toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
      }
      this.toolItems$.next(toolbarList)
    })

  }

  loadData() {
    Promise.all([
      this.getById(), //0
      this.getPosition(), //1
      this.getGender(), //2
      this.getNation(), //3
      this.getNationality(), //4
      this.getReligion(), //5
      this.getListStatusEmp(), //6
      this.getProvince(), //7
      this.getListFamilyStatus(), //8
      this.getEmpSituation(),
      this.getlstTrainingFormId(),
      this.GetListLearningLevel(),
      this.getlstBankId(),
      this.getlstResident()
    ]).then((res: any) => {
      this.lstPositionId = res[1];
      this.lstGenderId = res[2];
      this.lstNativeId = res[3];
      this.lstNationalityId = res[4];
      this.lstReligionId = res[5];
      this.lstWorkStatusId = res[6];
      this.lstProvinceId = res[7];
      this.lstCurProvinceId = res[7];
      this.lstMaritalStatusId = res[8];
      this.lstEmpSituation = res[9];
      this.lstTrainingFormId = res[10];
      this.lstLearningLevelId = res[11];
      this.lstBankId = res[12];
      this.lstResident = res[13];
      if (this.paramId) {
        this.model = _.cloneDeep(_.omit(res[0], ["districtId", "wardId"], ["curDistrictId", "curWardId"]));

        this.loadDatalazy(res[0]);
        this.getListSituation();
        this.getListPaper();
      }
    });
  }

  getById() {
    return new Promise((resolve) => {
      if (this.paramId) {
        this._coreService
          .Get("hr/Employee/get?id=" + this.paramId)
          .subscribe((res: any) => {
            resolve(res.data);
          });
      } else {
        resolve(false);
      }
    });
  }
  getGender() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/otherlist/GENDER").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getEmpSituation() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/otherlist/EmpSituation").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getNation() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/otherlist/NATION").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getNationality() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/otherlist/NATIONALITY").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getReligion() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/otherlist/RELIGION").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getListFamilyStatus() {
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/otherlist/GetListFamilyStatus")
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  getListStatusEmp() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/otherlist/STATUSEMPLOYEE").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getPosition() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/Position/GetList").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getProvince() {
    return new Promise((resolve) => {
      this._coreService.Get("hr/province/getListProvince").subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getlstTrainingFormId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/otherlist/GetListTrainingForm")
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  GetListLearningLevel() {
    //trình độ học vấn
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/otherlist/GetListLearningLevel")
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  getlstBankId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/bank/GetList")
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  getlstResident() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/otherlist/GetResident")
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }
  loadDatalazy(model: Employee) {
    if (model && model.provinceId) {
      this.getDistrict(model.provinceId)
        .then((res: any) => {
          this.lstDistrictId = res;
        })
        .then((x) => {
          this.model.districtId = model.districtId;
        });
      this.getWard(model.districtId)
        .then((res: any) => {
          this.lstWardId = res;
        })
        .then((x) => {
          this.model.wardId = model.wardId;
        });
    }
    if (model && model.curProvinceId) {
      this.getDistrict(model.curProvinceId)
        .then((res: any) => {
          this.lstCurDistrictId = res;
        })
        .then((x) => {
          this.model.curDistrictId = model.curDistrictId;
        });
      this.getWard(model.curDistrictId)
        .then((res: any) => {
          this.lstCurWardId = res;
        })
        .then((x) => {
          this.model.curWardId = model.curWardId;
        });
    }
  }
  changeProvince(e: any) {
    if (e.e) {
      this.model.districtId = undefined;
      this.lstDistrictId = [];
      this.model.wardId = undefined;
      this.lstWardId = [];
      this.getDistrict(e.itemData.id).then((res: any) => {
        this.lstDistrictId = res;
      });
    }
  }
  changeCurProvince(e: any) {
    if (e.e) {
      this.model.curDistrictId = undefined;
      this.lstCurDistrictId = [];
      this.model.curWardId = undefined;
      this.lstCurWardId = [];
      this.getDistrict(e.itemData.id).then((res: any) => {
        this.lstCurDistrictId = res;
      });
    }
  }
  changeDistrict(e: any) {
    if (e.e) {
      this.model.wardId = undefined;
      this.lstWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lstWardId = res;
      });
    }
  }
  changeCurDistrict(e: any) {
    if (e.e) {
      this.model.curWardId = undefined;
      this.lstCurWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lstCurWardId = res;
      });
    }
  }
  getDistrict(id: number) {
    return new Promise((resolve) => {
      if (id) {
        this._coreService
          .Get("hr/province/getListDistrict?provinceId=" + id)
          .subscribe((res: any) => {
            resolve(res.data);
          });
      } else {
        resolve(false);
      }
    });
  }
  getWard(id: any) {
    return new Promise((resolve) => {
      this._coreService
        .Get("hr/province/getListWard?districtid=" + id)
        .subscribe((res: any) => {
          resolve(res.data);
        });
    });
  }

  // Event Click Toolbar
  clickToolbar = (itemButton: any): void => {
    const buttonId = itemButton.id;
    switch (buttonId) {
      case ToolbarItem.BACK:
        if (this.editForm.dirty && this.editForm.touched) {
          this.flagePopup = false;
        }
        if (
          (this.editForm.dirty && this.editForm.touched) ||
          this.flagePopup === false
        ) {
          this.modalService.open("confirm-back-modal");
        }
        if (this.flagePopup === true) {
          this.router.navigate(["cms/profile/business/staffprofile"]);
        }
        break;
      case ToolbarItem.ADD:
        break;
      case ToolbarItem.SAVE:
        if (this.tab == 5) {
          this.saveSituation();
        } else if (this.tab == 6) {
          this.savePosPage();
        }
        else { this.saveData(); }
        break;
      case ToolbarItem.EDIT:
        this.flagState$.next("edit");
        this.flagePopup = true;
        this.editForm.enable();
        break;
      case ToolbarItem.DELETE:
        break;
      case ToolbarItem.PRINT:
        this._coreService
          .Get("hr/FormList/PrintFormProfile?id=" + this.model.id)
          .subscribe(
            (res: any) => {
              //check error
              if (res.statusCode == "400") {
                this.notification.warning(res.message);
              } else {
                // xử lý bất đồng bộ : đợi replace dữ liệu vào rồi mới print
                if (res.data && res.data[1] && res.data[0] && res.data[0][0]) {
                  let data = res.data[1];
                  let form = res.data[0][0]["TEXT"];
                  let decision = res.data[2];
                  let contract = res.data[3];
                  let comment = res.data[4];
                  let discipline = res.data[5];
                  let inschange = res.data[6];
                  var div = document.createElement("div");
                  div.innerHTML = form;
                  // replace thông tin cơ bản nhân viên
                  async.waterfall([
                    (cb: any) => {
                      let name = Object.getOwnPropertyNames(data[0]);
                      for (let i = 0; i < name.length; i++) {
                        while (form.indexOf(name[i]) > -1) {
                          if (name[i] == "AVATAR") {
                            form = form.replace("[" + name[i] + "]", `<img src="` + data[0][name[i]] + `" style="width: 166px; height: 166px"/>`);
                          }
                          else if (data[0][name[i]] == null) {
                            form = form.replace("[" + name[i] + "]", "");
                          }
                          else {
                            form = form.replace("[" + name[i] + "]", data[0][name[i]]);
                          }
                        }
                      }
                      div.innerHTML = form;
                      return cb();
                    },
                    (cb1: any) => {
                      // xử lý render các bảng quá trình công tác
                      let trsDecision: any[] = [];
                      let trsContract: any[] = [];
                      let trsComment: any[] = [];
                      let trsDiscipline: any[] = [];
                      let trsInschange: any[] = [];
                      let listTr = div.querySelectorAll("tr");
                      listTr.forEach((ele) => {
                        let a = $(ele).html();
                        if (a.indexOf("D_TYPE_NAME") > -1) {
                          trsDecision.push(ele);
                        }
                        if (a.indexOf("C_TYPE_NAME") > -1) {
                          trsContract.push(ele);
                        }
                        if (a.indexOf("CM_TYPE_NAME") > -1) {
                          trsComment.push(ele);
                        }
                        if (a.indexOf("DIS_TYPE_NAME") > -1) {
                          trsDiscipline.push(ele);
                        }
                        if (a.indexOf("TYPE_CHANGE") > -1) {
                          trsInschange.push(ele);
                        }
                      })
                      if (decision.length != 0) {
                        // quyêt định thay đổi
                        let decisionName = Object.getOwnPropertyNames(decision[0]);
                        //fill dữ liệu
                        trsDecision.forEach((tr) => {
                          let tbody = $(tr).parent();
                          let td = $(tr).html();
                          decision.forEach((item: any) => {
                            let s = td;
                            for (let i = 0; i < decisionName.length; i++) {
                              while (s.indexOf(decisionName[i]) > -1) {
                                s = s.replace("[" + decisionName[i] + "]", item[decisionName[i]]);
                              }
                            }
                            let newTr = tr.cloneNode();
                            $(newTr).html(s);
                            tbody.append(newTr);
                          });
                          tr.remove();
                        });
                      }
                      if (contract.length != 0) {
                        // hợp đồng
                        let contractName = Object.getOwnPropertyNames(contract[0]);
                        trsContract.forEach((tr) => {
                          let tbody = $(tr).parent();
                          let td = $(tr).html();
                          contract.forEach((item: any) => {
                            let s = td;
                            for (let i = 0; i < contractName.length; i++) {
                              while (s.indexOf(contractName[i]) > -1) {
                                s = s.replace("[" + contractName[i] + "]", item[contractName[i]]);
                              }
                            }
                            let newTr = tr.cloneNode();
                            $(newTr).html(s);
                            tbody.append(newTr);
                          });
                          tr.remove();
                        });
                      }
                      if (comment.length != 0) {
                        // khen thưởng
                        let commentName = Object.getOwnPropertyNames(comment[0]);
                        trsComment.forEach((tr) => {
                          let tbody = $(tr).parent();
                          let td = $(tr).html();
                          comment.forEach((item: any) => {
                            let s = td;
                            for (let i = 0; i < commentName.length; i++) {
                              while (s.indexOf(commentName[i]) > -1) {
                                s = s.replace("[" + commentName[i] + "]", item[commentName[i]]);
                              }
                            }
                            let newTr = tr.cloneNode();
                            $(newTr).html(s);
                            tbody.append(newTr);
                          });
                          tr.remove();
                        });
                      }
                      if (discipline.length != 0) {
                        // kỷ luật
                        let disciplineName = Object.getOwnPropertyNames(discipline[0]);
                        trsDiscipline.forEach((tr) => {
                          let tbody = $(tr).parent();
                          let td = $(tr).html();
                          discipline.forEach((item: any) => {
                            let s = td;
                            for (let i = 0; i < disciplineName.length; i++) {
                              while (s.indexOf(disciplineName[i]) > -1) {
                                s = s.replace("[" + disciplineName[i] + "]", item[disciplineName[i]]);
                              }
                            }
                            let newTr = tr.cloneNode();
                            $(newTr).html(s);
                            tbody.append(newTr);
                          });
                          tr.remove();
                        });
                      }
                      if (inschange.length != 0) {
                        // biến động bảo hiểm
                        let inschangeName = Object.getOwnPropertyNames(inschange[0]);
                        trsInschange.forEach((tr) => {
                          let tbody = $(tr).parent();
                          let td = $(tr).html();
                          inschange.forEach((item: any) => {
                            let s = td;
                            for (let i = 0; i < inschangeName.length; i++) {
                              while (s.indexOf(inschangeName[i]) > -1) {
                                s = s.replace("[" + inschangeName[i] + "]", item[inschangeName[i]]);
                              }
                            }
                            let newTr = tr.cloneNode();
                            $(newTr).html(s);
                            tbody.append(newTr);
                          });
                          tr.remove();
                        });
                      }
                      return cb1();

                    }
                  ], (err: any, result: any) => {
                    //print
                    setTimeout(() => {
                      print($(div).html());
                      function print(text: any) {
                        let popupWin = window.open(
                          "",
                          "_blank",
                          "top=0,left=0,height='100%',width=auto"
                        );
                        popupWin!.document.write(text);
                        popupWin!.document.close();
                        popupWin!.print();
                        popupWin!.onafterprint = function () {
                          popupWin!.close();
                        };
                      }
                    }, 500);
                  })




                }
                else if (res.data[0].length == 0) {
                  this.notification.warning("Bạn chưa thiết lập mẫu sơ yếu lý lịch !")
                }
                // let data = res.data.FORM;
                // let popupWin = window.open(
                //   "",
                //   "_blank",
                //   "top=0,left=0,height='100%',width=auto"
                // );
                // popupWin!.document.write(data);
                // popupWin!.document.close();
                // popupWin!.print();
                // popupWin!.onafterprint = function () {
                //   popupWin!.close();
                // };
              }
            });
        break;
      default:
        break;
    }
  };
  choiseOrg() {
    if (this.flagState$.value == "view") {
      return;
    }
    let param = {
      selected: this.model.orgId, //select employee on grid
    };
    this.modalService.open("cms-app-modals-org", param);
    const x = this.modalService.organization.subscribe((res: any) => {
      this.model.orgId = res.ID;
      this.model.orgName = res.NAME;
      this.model.orgManager = res.MANAGER_NAME;
      x.unsubscribe();
    });
  }
  changeName() {
    this.model.fullname = this.model.firstName + " " + this.model.lastName;
    this.demo.next(this.model.firstName);
  }
  // update avtar
  uploadAvatar(files: FileList | null) {
    setTimeout(() => {
      if (files!.length > 0) {
        let data = new FormData();
        for (let i = 0; i < files!.length; i++) {
          data.append("files", files![i]);
        }
        this._coreService.uploadFile(data, "profile").subscribe((res: any) => {
          if (res.status == 200) {
            this.model.avatar = res.data[0].url;
            let x: any = document.getElementById("avatar");
            x.value = null;
          }
        });
      }
    }, 200);
  }
  changePosition(e: any) {
    if (e.e) {
      let item = _.find(this.lstPositionId, { id: Number(e.itemData.id) });

      this.model.positionName = item.name;
    }
  }
  rowSelecting(e: any) {
    this.situation = e.data;
  }

  rowSelectingPage(e: any) {
    this.posPage = e.data;
  }
  changeTab(e: any) {
    this.tab = e;
  }

  RemoveRelation(id: any) {
    this.removeId = id;
    this.modalService.open("confirm-back-modal1");
   // this.modalService.open("confirm-delete-modal1");
  }

  confirmDelete = (status: any): void => {
    if (status === "cancel") {
      this.modalService.close("confirm-back-modal1");
    } else {
      this._coreService.Post("hr/employee/RemoveRelation", this.removeId).subscribe(
        (res: any) => {
          //check error
          if (res.statusCode == 400) {
            this.notification.checkErrorMessage(res.message);
            this.modalService.close("confirm-back-modal1");
          } else {
            this.notification.addSuccess();
            this.getListSituation();
            this.modalService.close("confirm-back-modal1");
          }
        },
        (error: any) => {
          this.notification.addError();
          this.modalService.close("confirm-back-modal1");
        }        
      );
    }
  };
  // lưu data open popup
  saveData = () => {
    if (!this.editForm.valid) {
      this.notification.warning("Form chưa hợp lệ !");
      this.editForm.markAllAsTouched();
      return;
    }
    let param = this.convertModel(this.model);

    if (this.flagState$.value === "new") {
      this._coreService.Post("hr/employee/add", param).subscribe(
        (res: any) => {
          //check error
          if (res.statusCode == 400) {
            this.notification.checkErrorMessage(res.message);
          } else {
            this.notification.addSuccess();
            this.router.navigate(["/cms/profile/business/family-change"]);
          }
        },
        (error: any) => {
          this.notification.addError();
        }
      );
    } else {
      this._coreService.Post("hr/employee/Update", param).subscribe(
        (res: any) => {
          if (res.statusCode == 400) {
            this.notification.checkErrorMessage(res.message);
          } else {
            this.notification.editSuccess();
            this.router.navigate(["/cms/profile/business/staffprofile"]);
          }
        },
        (error: any) => {
          this.notification.editError();
        }
      );
    }
  };
  getListSituation() {
    this._coreService
      .Get("hr/Employee/ListSituation?empId=" + this.model.id)
      .subscribe((res: any) => {
        this.data = res.data;
        this.gridInstance.refresh();
      });
  }
  saveSituation() {
    this.situation.employeeId = this.model.id;
    let model = _.cloneDeep(this.situation);
    model.birth = model.birth ? moment(model.birth).format("MM/DD/YYYY") : null;
    model.dateStart = model.dateStart
      ? moment(model.dateStart).format("MM/DD/YYYY")
      : null;
    model.dateEnd = model.dateEnd
      ? moment(model.dateEnd).format("MM/DD/YYYY")
      : null;

    this._coreService
      .Post("hr/Employee/AddSituation", model)
      .subscribe((res: any) => {
        //check error
        if (res.statusCode == 400) {
          this.notification.checkErrorMessage(res.message);
        } else {
          this.notification.addSuccess();
          this.editForm.controls["situation"].reset();
          this.getListSituation();
        }
      });
  }
  savePosPage() {
    this.posPage.empId = this.model.id;
    let model = _.cloneDeep(this.posPage);
    model.dateInput = model.dateInput ? moment(model.dateInput).format("MM/DD/YYYY") : null;
    this._coreService
      .Post("hr/Employee/CreatePaper", model)
      .subscribe((res: any) => {
        //check error
        if (res.statusCode == 400) {
          this.notification.checkErrorMessage(res.message);
        } else {
          this.notification.addSuccess();
          this.editForm.controls["page"].reset();
          this.getListPaper();
        }
      });
  }
  getListPaper() {
    this._coreService
      .Get("hr/Employee/GetListPaper?empId=" + this.model.id)
      .subscribe((res: any) => {
        this.dataPage = res.data;
        this.gridInstance.refresh();
      });
  }
  ViewHistory(param: any) {
    this.flagView = param;
    if (param == "decision") {
      this._coreService
        .Get("hr/working/GetAll?PageNo=1&PageSize=500&orgId=" + this.model.orgId + "&employeeCode=" + this.model.code)
        .subscribe((res: any) => {
          this.dataHistory = res.data
        });
    }
    if (param == "contract") {
      this._coreService
        .Get("hr/contract/GetAll?PageNo=1&PageSize=500&orgId=" + this.model.orgId + "&employeeCode=" + this.model.code)
        .subscribe((res: any) => {
          this.dataHistory = res.data
        });
    }
    if (param == "commend") {
      this._coreService
        .Get("hr/commend/GetAll?PageNo=1&PageSize=500&orgId=" + this.model.orgId + "&employeeCode=" + this.model.code)
        .subscribe((res: any) => {
          this.dataHistory = res.data
        });
    }
    if (param == "discipline") {
      this._coreService
        .Get("hr/discipline/GetAll?PageNo=1&PageSize=500&orgId=" + this.model.orgId + "&employeeCode=" + this.model.code)
        .subscribe((res: any) => {
          this.dataHistory = res.data
        });
    }
    if (param == "inschange") {
      this._coreService
        .Get("hr/inschange/GetAll?PageNo=1&PageSize=500&orgId=" + this.model.orgId + "&employeeCode=" + this.model.code)
        .subscribe((res: any) => {
          this.dataHistory = res.data
        });
    }

  }
  convertModel(param: any) {
    let model = _.cloneDeep(param);

    model.birthDate = model.birthDate
      ? moment(model.birthDate).format("MM/DD/YYYY")
      : null;
    model.idDate = model.idDate
      ? moment(model.idDate).format("MM/DD/YYYY")
      : null;
    model.joinDate = model.joinDate
      ? moment(model.joinDate).format("MM/DD/YYYY")
      : null;
    model.terEffectDate = model.terEffectDate
      ? moment(model.terEffectDate).format("MM/DD/YYYY")
      : null;
    model.passDate = model.passDate
      ? moment(model.passDate).format("MM/DD/YYYY")
      : null;
    model.passExpire = model.passExpire
      ? moment(model.passExpire).format("MM/DD/YYYY")
      : null;
    model.visaDate = model.visaDate
      ? moment(model.visaDate).format("MM/DD/YYYY")
      : null;
    model.visaExpire = model.visaExpire
      ? moment(model.visaExpire).format("MM/DD/YYYY")
      : null;
    model.workPermitDate = model.workPermitDate
      ? moment(model.workPermitDate).format("MM/DD/YYYY")
      : null;
    model.workPermitExpire = model.workPermitExpire
      ? moment(model.workPermitExpire).format("MM/DD/YYYY")
      : null;

    return model;
  }
  // change date
  changeDate = (model: any) => {
    setTimeout(() => {
      const idDate = "#" + model + "_input";
      const value = $(idDate).val();
      //get form group of control
      let form: any;
      for (let field in this.editForm.controls) {
        if (this.editForm.controls[field].get(model)) {
          form = this.editForm.controls[field].get(model);
        }
      }
      var patt = new RegExp(
        "q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m"
      );
      if (value.length === 0) {
        form.setErrors({ required: true });
        return;
      } else if (value.length > 0 && patt.test(value.toLowerCase()) === true) {
        form.setErrors({ incorrect: true });
        return;
      } else if (value.length > 10) {
        form.setErrors({ incorrect: true });
        return;
      } else {
        form.clearValidators();
      }
      if (
        value &&
        ((value.length === 8 && value.indexOf("/") === -1) ||
          (value.length === 6 && value.indexOf("/") === -1) ||
          (value.length === 10 && value.indexOf("/") > -1))
      ) {
        if (value.indexOf("-") === -1) {
          const returnDate = this.globals.replaceDate(value);
          // (this.model as any)[model] = returnDate;
          if (returnDate && returnDate.length > 0) {
            $(idDate).val(returnDate);
            const dateParts: any = returnDate.split("/");
            (this.model as any)[model] = new Date(
              +dateParts[2],
              dateParts[1] - 1,
              +dateParts[0]
            );
            form.clearValidators();
          }
        }
      }
    }, 200);
  };
  coppyAddress() {
    if (this.model.provinceId != null) {
      this.model.curProvinceId = this.model.provinceId;
      this.getDistrict(this.model.curProvinceId).then((res: any) => {
        this.lstCurDistrictId = res;
        this.model.curDistrictId = this.model.districtId;
        this.getWard(this.model.curDistrictId).then((res: any) => {
          this.lstCurWardId = res;
          this.model.curWardId = this.model.wardId;
        });
      });
      this.model.curAddress = this.model.address;
    }
  }
  confirmBack = (status: any): void => {
    if (status === "cancel") {
      this.modalService.close("confirm-back-modal");
    } else {
      this.modalService.close("confirm-back-modal");
      this.router.navigate(["/cms/profile/business/staffprofile"]);
    }
  };
  // filter type
  // change date
  public onFiltering(e: any, a: any) {
    e.preventDefaultAction = true;
    const predicate = new Predicate("name", "contains", e.text, true, true);
    this.query = new Query();
    this.query = e.text !== "" ? this.query.where(predicate) : this.query;
    e.updateData(a, this.query);
  }
}
