// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "tab-tools" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed

      // const compareStr = (
      //   str1: string | undefined = "",
      //   str2: string | undefined = ""
      // ) => (str1 === str2 ? 0 : str1 < str2 ? -1 : 1);

      // Display a message box to the user
      // vscode.window.activeTextEditor
      // moveActiveEditor
      const currOpen = vscode.window.activeTextEditor!.document;
      // const g = vscode.window
      // visibleTextEditors
      // vscode.workspace.textDocuments

      const sorted = vscode.workspace.textDocuments.sort((a, b) => {
        const str1 = a.fileName;
        const str2 = b.fileName;
        return str1 === str2 ? 0 : str1 < str2 ? -1 : 1;
      });

      console.log(sorted);

      for (let i = 0; i < sorted.length; i++) {
        await new Promise((resolve, reject) => {
          const element = sorted[i];
          vscode.window.showTextDocument(element).then(r => {
            vscode.commands
              .executeCommand("moveActiveEditor", {
                to: "position",
                value: i
              })
              .then(resolve, reject);
          }, reject);
        });
      }

      await vscode.window.showTextDocument(currOpen);
      // export function showTextDocument(document: TextDocument, column?: ViewColumn, preserveFocus?: boolean): Thenable<TextEditor>;

      // currOpen.document.fileName;
      // vscode.window.visibleTextEditors[0].document;

      vscode.window.showInformationMessage("Hello World!");
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
