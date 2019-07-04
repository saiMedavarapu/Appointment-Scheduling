"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var FocusTrap = /** @class */ (function () {
    function FocusTrap(el) {
        this.el = el;
    }
    FocusTrap.prototype.onkeydown = function (e) {
        if (e.which === 9) {
            event.preventDefault();
            var focusableElements = domhandler_1.DomHandler.getFocusableElements(this.el.nativeElement);
            if (focusableElements && focusableElements.length > 0) {
                if (!document.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    var focusedIndex = focusableElements.indexOf(document.activeElement);
                    if (e.shiftKey) {
                        if (focusedIndex == -1 || focusedIndex === 0)
                            focusableElements[focusableElements.length - 1].focus();
                        else
                            focusableElements[focusedIndex - 1].focus();
                    }
                    else {
                        if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                            focusableElements[0].focus();
                        else
                            focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
    };
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FocusTrap.prototype, "onkeydown", null);
    FocusTrap = __decorate([
        core_1.Directive({
            selector: '[pFocusTrap]',
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FocusTrap);
    return FocusTrap;
}());
exports.FocusTrap = FocusTrap;
var FocusTrapModule = /** @class */ (function () {
    function FocusTrapModule() {
    }
    FocusTrapModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [FocusTrap],
            declarations: [FocusTrap]
        })
    ], FocusTrapModule);
    return FocusTrapModule;
}());
exports.FocusTrapModule = FocusTrapModule;
//# sourceMappingURL=focustrap.js.map