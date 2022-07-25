import { HomeBundleEn } from "./english/HomeBundleEn.js";
import { LoginBundleEn } from "./english/LoginBundleEn.js";
import { Language } from "./Language.js";
import { HomeBundleEs } from "./spanish/HomeBundleEs.js";
import { LoginBundleEs } from "./spanish/LoginBundleEs.js";

export class TextBundle {

    public static get (lang : string) {
      switch (lang) {
        case Language.ENGLISH:
            return this.getBundleEn();
        case Language.SPANISH:
            return this.getBundleEs();
        default:
            return this.getBundleEn();
      }
    }

    public static getBundleEn() {
        return {
            home : HomeBundleEn,
            login : LoginBundleEn
        };
    }

    public static getBundleEs() {
        return {
           home : HomeBundleEs,
           login : LoginBundleEs
        };
    }

}