import App from "../../App.js";
import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";


export default class LoginView extends ViewUI {

    private static ID = "login";
    private static TITLE_ID = "title";
    private static USERNAME_ID = "username";
    private static PASSWORD_ID = "password";
    private static GO_BUTTON_ID = "go-button";

    
    public constructor(){
        super({
            type: "view",
            id: LoginView.ID,
            classes: ["box-column","box-center"],
        })
    }

    public show(params : string[], container : UIComponent): void {


        const title = new UIComponent({
            type: "h1",
            id: LoginView.TITLE_ID,
            text: App.getBundle().login.LOGIN
        })

        title.appendTo(this);

        const username = new UIComponent({
            type: "input",
            id: LoginView.USERNAME_ID,
            attributes : {
                type: "text",
                placeholder : App.getBundle().login.USERNAME
            },
        })

        username.appendTo(this)

        const password = new UIComponent({
            type: "input",
            id: LoginView.PASSWORD_ID,
            attributes : {
                type: "password",
                placeholder : App.getBundle().login.PASSWORD
            },
        })

        password.appendTo(this);

        const button = new UIComponent({
            type: "button",
            id: LoginView.GO_BUTTON_ID,
            text: App.getBundle().login.GO + "&nbsp;",
        })

        const coffeeIcon = getMaterialIcon("expand",{
            size: "1.5rem",
            fill: "#444"
        });

        coffeeIcon.element.style.transform = "rotate(-90deg)";
        coffeeIcon.appendTo(button);

        button.appendTo(this);

        this.appendTo(container);
    }

}