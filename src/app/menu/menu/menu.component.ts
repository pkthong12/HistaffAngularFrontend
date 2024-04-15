import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumTranslateKey } from 'src/app/enum/EnumTranslateKey';
import { api } from 'src/app/constants/api/apiDefinitions';
import { EnumCoreTablePipeType } from 'src/app/libraries/core-table/EnumCoreTablePipeType';
import { ICorePageEditCRUD } from 'src/app/libraries/core-page-edit/core-page-edit.component';
import { ICoreTreeGridColumnItem } from 'src/app/libraries/core-tree-grid/core-tree-grid-interfaces';
import { EnumFormBaseContolType } from 'src/app/libraries/core-form/core-form/enum-interfaces';
import { Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICoreDropdownOption } from 'src/app/libraries/core-dropdown/core-dropdown/core-dropdown.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit, OnDestroy {

  // For CorePageHeader
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MENU;


  /**
   * FOR CoreTreeGrid
   */
  getFullListApi: api = api.SYS_MENU_READ_ALL;

  crud: ICorePageEditCRUD = {
    c: api.SYS_MENU_CREAT,
    r: api.SYS_MENU_READ,
    u: api.SYS_MENU_UPDATE,
    d: api.SYS_MENU_DELETE,
  }

  functionDropdownOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  subscriptions: Subscription[] = [];

  columns: ICoreTreeGridColumnItem[] = [
    {
      // Hiển thị cột 'id' là bắt buộc
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'number',
      align: 'right',
      width: 80,
      control: {
        flexSize: 12,
        controlType: EnumFormBaseContolType.TEXTBOX,
        field: 'id',
        label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
        value: null,
        disabled: true,
        type: 'number',
      }
    },
    {
      // Nếu hiển thị cột 'tree$Path', ví dụ 1.59.163 => sinh tự động, không cần viết API
      caption: EnumTranslateKey.UI_CORE_TREE_GRID_TREE_PATH,
      field: 'tree$Path',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
      translate: true,
      control: {
        flexSize: 12,
        controlType: EnumFormBaseContolType.TEXTBOX,
        field: 'code',
        label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
        value: '',
        type: 'text',
        validators: [
          {
            name: 'required',
            validator: Validators.required,
            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
          },
          {
            name: 'minLength',
            validator: Validators.minLength(6),
            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH
          },
        ]
      }
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
      field: 'functionName',
      type: 'string',
      align: 'left',
      width: 200,
      translate: true,
      control: {
        flexSize: 12,
        controlType: EnumFormBaseContolType.DROPDOWN,
        dropdownOptions$: this.functionDropdownOptions$,
        getByIdObject$: new BehaviorSubject<any>({}),
        getByIdApi: api.SYS_FUNCTION_READ,
        boundFrom: 'id',
        shownFrom: 'name',
        field: 'functionId',
        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FUNCTION_NAME,
        value: null,
        type: 'number',
        validators: [
          {
            name: 'min',
            validator: Validators.minLength(1),
            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN
          },
        ]
      }
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ORDER_NUMBER,
      field: 'orderNumber',
      type: 'number',
      align: 'right',
      width: 100,
      control: {
        flexSize: 12,
        controlType: EnumFormBaseContolType.TEXTBOX,
        field: 'orderNumber',
        label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
        value: null,
        type: 'number',
        validators: [
          {
            name: 'min',
            validator: Validators.min(1),
            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN
          },
        ]
      }
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_ICON_CLASS,
      field: 'iconClass',
      type: 'string',
      align: 'left',
      width: 200,
      control: {
        flexSize: 12,
        controlType: EnumFormBaseContolType.TEXTBOX,
        field: 'iconClass',
        label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
        value: '',
        type: 'text',
        validators: [
          {
            name: 'minLength',
            validator: Validators.minLength(1),
            errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH
          },
        ]
      }
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_URL,
      field: 'url',
      type: 'string',
      align: 'left',
      width: 300,
      control: {
        flexSize: 12,
        controlType: EnumFormBaseContolType.TEXTBOX,
        field: 'url',
        label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
        value: '',
        type: 'text',
      }
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MENU_PARENT,
      field: 'parent',
      type: 'number',
      align: 'right',
      width: 100,
      control: {
        flexSize: 12,
        controlType: EnumFormBaseContolType.TEXTBOX,
        field: 'parent',
        label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
        value: null,
        type: 'number',
      }
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
      field: 'createdDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_BY,
      field: 'createdByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_DATE,
      field: 'updatedDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_BY,
      field: 'updatedByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
  ]

  /* End Properties being passed to CoreTreeGrid */

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) {

  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.appService.get(api.SYS_FUNCTION_READ_ALL).subscribe(x => {
        if (x.ok && x.status === 200) {
          if (!!x.body.innerBody) {
            const newOptions: ICoreDropdownOption[] = [];
            x.body.innerBody.map((m: any) => {
              newOptions.push({
                value: m.id,
                text: `${m.name} (${m.code})`
              })
            })
            this.functionDropdownOptions$.next(newOptions);
          }
        }
      })
    )
  }

  onRowDoubleClick(event: any): void {

    this.router.navigate(
      [
        {
          outlets: {
            menuAux: [
              btoa(event.id.toString()),
            ],
          },
        },
      ],
      { relativeTo: this.route }
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.push(

    )
  }

}
