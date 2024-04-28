export const resetPasswordTemplate = `
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: yellow;
            }
        </style>
    </head>
    <body>
        <h1>Hello {{name}}</h1>
        <h4>We sent you this message because you forgot yur password</h4>
        <h4>Click this <a href="{{url}}">Link</a> to Reset your password.</h4>
    </body>
</html>`;
