import App from "../../App.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";


export default class RegisterView extends ViewUI {

    private static ID = "register";
    private static TITLE_ID = "title";
    private static USERNAME_ID = "username";
    private static PASSWORD_ID = "password";
    private static GO_BUTTON_ID = "go-button";

    
    public constructor(){
        super({
            type: "view",
            id: RegisterView.ID,
            classes: ["box-column","box-center"],
        })
    }

    public show(params : string[], container : UIComponent): void {


        const title = new UIComponent({
            type: "h1",
            id: RegisterView.TITLE_ID,
            text: App.getBundle().login.SIGN_IN
        })

        title.appendTo(this);

        const username = new UIComponent({
            type: "input",
            id: RegisterView.USERNAME_ID,
            attributes : {
                type: "text",
                placeholder : App.getBundle().login.USERNAME
            },
        })

        username.appendTo(this)

        const password = new UIComponent({
            type: "input",
            id: RegisterView.PASSWORD_ID,
            attributes : {
                type: "password",
                placeholder : App.getBundle().login.PASSWORD
            },
        })

        password.appendTo(this);

        const button = new UIComponent({
            type: "button",
            id: RegisterView.GO_BUTTON_ID,
            text: App.getBundle().login.GO,
        })
        button.appendTo(this);

        this.appendTo(container);
    }

}