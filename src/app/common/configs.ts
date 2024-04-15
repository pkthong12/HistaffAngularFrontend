import { Injectable } from "@angular/core";
import { EditSettingsModel } from "@syncfusion/ej2-angular-grids";
const $ = require("jquery");

@Injectable()
export class Configs {
  // Language
  currentLang = localStorage.getItem("lang")! || "en";
  height = (): number => {
    let groupFilter = $(".group-filter").outerHeight(); // from phia tren grid cong voi padding
    let gridheader = $(".e-gridheader").outerHeight(); // phần header của lưới
    let gridpager = $(".e-gridpager").outerHeight(); // phần footer của lưới
    let groupdroparea = $(".e-groupdroparea").outerHeight(); // Phần filtter
    let summaryrow = $(".e-summaryrow").outerHeight(); // Phần filtter
    groupFilter = groupFilter ? groupFilter : 0;
    gridheader = gridheader ? gridheader : 0;
    gridpager = gridpager ? gridpager : 0;
    groupdroparea = groupdroparea ? groupdroparea : 0;
    summaryrow = summaryrow ? summaryrow : 0;
    const heightAppContent = $(".app-content").innerHeight();

    return (
      heightAppContent -
      gridpager -
      groupFilter -
      gridheader -
      groupdroparea -
      summaryrow
    );
  };
  heightTimeSheet = (): number => {
    let groupFilter = $(".group-filter").outerHeight(); // from phia tren grid cong voi padding
    let gridheader = $(".e-gridheader").outerHeight(); // phần header của lưới
    let gridpager = $(".e-gridpager").outerHeight(); // phần footer của lưới
    groupFilter = groupFilter ? groupFilter : 0;
    gridheader = gridheader ? gridheader : 0;
    gridpager = gridpager ? gridpager : 0;
    const heightAppContent = $(".app-content").innerHeight();

    return heightAppContent - gridpager - groupFilter - gridheader - 215;
  };
  heightLevelCompet = (): number => {
    let groupFilter = $(".group-filter").outerHeight(); // from phia tren grid cong voi padding
    let gridheader = $(".e-gridheader").outerHeight(); // phần header của lưới
    let gridpager = $(".e-gridpager").outerHeight(); // phần footer của lưới
    groupFilter = groupFilter ? groupFilter : 0;
    gridheader = gridheader ? gridheader : 0;
    gridpager = gridpager ? gridpager : 0;
    const heightAppContent = $(".app-content").innerHeight();

    return heightAppContent - gridpager - groupFilter - gridheader - 250;
  };
  filterSettings = {
    type: "Menu",
    operators: {
      stringOperator: [{ value: "contains", text: "Bắt đầu bằng" }],
      numberOperator: [{ value: "Equal", text: "Bằng" }],
      dateOperator: [{ value: "Equal", text: "Bằng" }],
      booleanOperator: [{ value: "Equal", text: "Bằng" }],
    },
  };

  filterSettings2 = {
    type: "Menu",
    operators: {
      stringOperator: [
        { value: "startsWith", text: "Bắt đầu bằng" },
        { value: "endsWith", text: "Kết thúc bằng" },
        { value: "contains", text: "Chứa ký tự" },
      ],
      numberOperator: [
        { value: "Equal", text: "Bằng" },
        { value: "NotEqual", text: "Không bằng" },
        { value: "LessThan", text: "Nhỏ hơn" },
        { value: "LessThanOrEqual", text: "Nhỏ hơn hoặc bằng" },
        { value: "GreaterThan", text: "Lớn hơn" },
        { value: "GreaterThanOrEqual", text: "Lớn hơn hoặc bằng" },
      ],
      dateOperator: [
        { value: "Equal", text: "Bằng" },
        { value: "NotEqual", text: "Không bằng" },
        { value: "LessThan", text: "Nhỏ hơn" },
        { value: "LessThanOrEqual", text: "Nhỏ hơn hoặc bằng" },
        { value: "GreaterThan", text: "Lớn hơn" },
        { value: "GreaterThanOrEqual", text: "Lớn hơn hoặc bằng" },
      ],
      booleanOperator: [
        { value: "Equal", text: "Bằng" },
        { value: "NotEqual", text: "Không bằng" },
      ],
    },
  };

  public editSettings: EditSettingsModel = {
    allowEditing: false,
    allowAdding: false,
    allowDeleting: true,
    mode: "Dialog",
  };

  public editSettingsAllowAdd: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Normal",
  };

  public wrapSettings = { wrapMode: "Header" };
  filter = { type: "CheckBox" };
  pageSettings: Object = {
    pageSizes: [10, 20, 50, 200, 2000],
    pageSize: 20,
    pageCount: 4,
  };
  treeGridPageSettings: Object = { pageSize: 20, pageCount: 4 };
  selectionSettings = {
    type: "Multiple",
    checkboxOnly: true,
  };

  selectionSettingsNotCheck = {
    persistSelection: true,
    type: "Multiple",
    checkboxOnly: false,
  };

  selectionNonCheckSettings = {
    type: "Multiple",
  };

  selectionNonCheckSingle = {
    type: "Single",
    checkboxOnly: false,
  };

  editNumericParams = { params: { decimals: 0, min: 0 } };

  // Grid Translate
  languageGrid = {
    vi: {
      grid: {
        EmptyRecord: "Không có dữ liệu phù hợp.",
        EditOperationAlert: "Không chọn bản ghi nào để sửa!",
        Item: "Dòng bản ghi",
        Items: "Dòng bản ghi",
        FilterButton: "Tìm kiếm",
        ClearButton: "Hủy bỏ",
        EnterValue: "Tìm kiếm....",
        ChooseColumns: "Chọn cột hiển thị",
        SearchColumns: "Tìm kiếm cột",
        OKButton: "Đồng ý",
        CancelButton: "Hủy",
        SelectAll: "Chọn tất cả",
        Search: "Tìm kiếm",
        ChooseDate: "Chọn ngày",
        NoResult: "Không có dữ liệu phù hợp.",
        Matchs: "Không có dữ liệu phù hợp.",
      },
      listbox: {
        noRecordsTemplate: "Không có dữ liệu phù hợp.",
        selectAllText: "Chọn tất cả",
        unSelectAllText: "Bỏ chọn tất cả",
      },
      dropdowns: {
        noRecordsTemplate: "Không có dữ liệu phù hợp.",
        actionFailureTemplate: "Không tải được dữ liệu.",
      },
      pager: {
        currentPageInfo: "",
        pagerDropDown: "kết quả tìm kiếm",
        totalItemsInfo: "Tổng số bản ghi: {0}. Hiển thị",
        All: "Tất cả",
        pagerAllDropDown: "kết quả tìm kiếm",
      },
      datepicker: {
        today: "Hôm nay",
      },
    },
    en: {
      grid: {
        EmptyRecord: "Không có dữ liệu phù hợp.",
        EditOperationAlert: "Không chọn bản ghi nào để sửa!",
        Item: "Dòng bản ghi",
        Items: "Dòng bản ghi",
        FilterButton: "Tìm kiếm",
        ClearButton: "Hủy bỏ",
        EnterValue: "Tìm kiếm....",
        ChooseColumns: "Chọn cột hiển thị",
        SearchColumns: "Tìm kiếm cột",
        OKButton: "Đồng ý",
        CancelButton: "Hủy",
        SelectAll: "Chọn tất cả",
        Search: "Tìm kiếm",
        ChooseDate: "Chọn ngày",
        NoResult: "Không có dữ liệu phù hợp.",
        Matchs: "Không có dữ liệu phù hợp.",
      },
      listbox: {
        noRecordsTemplate: "Không có dữ liệu phù hợp.",
        selectAllText: "Chọn tất cả",
        unSelectAllText: "Bỏ chọn tất cả",
        NoResult: "Không có dữ liệu phù hợp.",
      },
      dropdowns: {
        noRecordsTemplate: "Không có dữ liệu phù hợp.",
        actionFailureTemplate: "Không tải được dữ liệu.",
      },
      pager: {
        currentPageInfo: "",
        pagerDropDown: "kết quả tìm kiếm",
        totalItemsInfo: "Tổng số bản ghi: {0}. Hiển thị",
        All: "Tất cả",
        pagerAllDropDown: "kết quả tìm kiếm",
      },
      datepicker: {
        today: "Hôm nay",
      },
    },
  };
}
