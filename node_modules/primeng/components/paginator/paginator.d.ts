import { OnInit, ChangeDetectorRef, EventEmitter, TemplateRef } from '@angular/core';
import { SelectItem } from '../common/selectitem';
export declare class Paginator implements OnInit {
    private cd;
    pageLinkSize: number;
    onPageChange: EventEmitter<any>;
    style: any;
    styleClass: string;
    alwaysShow: boolean;
    templateLeft: TemplateRef<any>;
    templateRight: TemplateRef<any>;
    dropdownAppendTo: any;
    dropdownScrollHeight: string;
    currentPageReportTemplate: string;
    showCurrentPageReport: boolean;
    pageLinks: number[];
    _totalRecords: number;
    _first: number;
    _rows: number;
    _rowsPerPageOptions: number[];
    rowsPerPageItems: SelectItem[];
    paginatorState: any;
    constructor(cd: ChangeDetectorRef);
    ngOnInit(): void;
    totalRecords: number;
    first: number;
    rows: number;
    rowsPerPageOptions: number[];
    isFirstPage(): boolean;
    isLastPage(): boolean;
    getPageCount(): number;
    calculatePageLinkBoundaries(): number[];
    updatePageLinks(): void;
    changePage(p: number): void;
    updateFirst(): void;
    getPage(): number;
    changePageToFirst(event: any): void;
    changePageToPrev(event: any): void;
    changePageToNext(event: any): void;
    changePageToLast(event: any): void;
    onPageLinkClick(event: any, page: any): void;
    onRppChange(event: any): void;
    updatePaginatorState(): void;
    readonly currentPageReport: string;
}
export declare class PaginatorModule {
}
