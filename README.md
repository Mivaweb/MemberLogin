# MemberLogin

[![Our Umbraco project page](https://img.shields.io/badge/our-umbraco-orange.svg)](https://our.umbraco.org/projects/backoffice-extensions/memberlogin/)

MemberLogin is a Umbraco backoffice extension package which allows you to impersonate as a Member into the front-end website.

## Getting Started

### Documentation

MemberLogin can be used in Umbraco V7 and V8 versions where can you login as a member from your backoffice into the front-end of your website.

### History Version

#### v2.0.0

Upgrade MemberLogin so it can be used in Umbraco V8.

- You can still select a node to be redirected to after the login
- Now in V8 when having a multi-langual website, you can even select the culture of the redirected page

In this way you can go directly to the correct language page of your website as a member.

*This version is only compatible with Umbraco V8!

#### v1.1.0

Ditched the Property Editor and moved to using a custom Action menu item on the Member tree.

*This version uses the directive umb-preview-node which was introduced in version 7.6!

#### v1.0.0

Initial release of the MemberLogin package.

First you need to create a new datatype of type MemberLogin in your developer section of Umbraco.
After that, you add a new property into your member document type, using this new datatype.

As you will see, this is only a button for doing the login as a Member.

## Contributors

* [Michaël Vanbrabandt](https://github.com/mivaweb)

## License

Copyright © 2018 Michaël Vanbrabandt

Licensed under the [MIT License](LICENSE.md)
