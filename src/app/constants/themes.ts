import { ITheme } from '../themes/ITheme';

export class themeBlue implements ITheme {
  colorBgMain = '#F1F1F1';
  colorBgBlock = 'white';
  colorBgHeader = 'bisque';
  colorBgPaginationButton = '#358ccb';
  colorPaginationButton = 'white';
  colorA = 'darkgray';
  colorAHover = 'rgb(80; 80; 80)';
  colorAActive = '#000';
  colorBgAActive = '#FF8D5D';
  colorBgMenuLevel1 = '#7eaccc';
  colorMenuLevel1 = '#FFFFFF';
  colorBgMenuLevel2 = '#7ebccc';
  colorMenuLevel2 = '#FFFFFF';
  colorBgMenuLevel3 = 'antiquewhite';
  colorMenuLevel3 = 'rgb(80; 80; 80)';
  colorScrollbarThumb = '#CDCDCD';
  colorBgCoreOrgTree = 'white';
  colorCoreOrgTreeHighlighted = 'brown';

  sizeCoreCompositionLeftpartWidth = '320px';
  sizeFormControlHeight = '50px';
  sizeCorePageHeaderHeight = '50px';
  sizeCorePaginationHeight = '50px';
  sizeCoreTabsHeight = '50px';
  sizeCoreOrgTreeWidth = '320px';
  sizeCoreOrgTreeHeaderHeight = '60px';
  sizeFileUploader = '200px';
  sizeContentContainerHeight = '500px';
  sizeScrollbarWidth = '7px';
  sizeIcon = '36px';
  sizeLeftBarFullWidth = '280px';
  sizeLeftBarCompactWidth = '90px';
  sizeLeftBarCurrentWidth = '280px';
  sizeRightBarFullWidth = '0px';
  sizeLayoutBlockCellSpacing = '10px';
  sizeLayoutBlockBorderRadius = '5px';
  sizeLeftBarBlockCellSpacing = '10px';
  sizeHeaderHeight = '96px';
  sizePaginationHeight = '50px';
  sizePaginationButtonSize = '50px';
  sizeCoreReducerIconWrapperHeight = '50px';

  // positionCoreCompositionLeftLeft= "50px",
  // sizeCoreCompositionLeftExpandedWidth= "",
  // sizeCoreCompositionLeftCurrentWidth= "",
  // sizeCoreCompositionLeftCollapsedWidth= "",

  typoLeftBarFontSize = '18px';
  typoPaginationFontSize = '18px';
  typoBasicFontSize = '14px';
  typoMenuActiveFontSize = '16px';

  typoFormLabelFontSize = '15px';
  typoFormLabelColor = 'gray';

  decorationBoxShadow = '0 1rem 3rem rgba(0, 0, 0, 0.18)';
}
