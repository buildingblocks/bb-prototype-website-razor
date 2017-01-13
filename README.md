## Installation

Install .net version manager (DNVM)
`curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.sh | DNX_BRANCH=dev sh && source ~/.dnx/dnvm/dnvm.sh`

Command line will then give you a command to type in, e.g.
`"Type 'source /Users/andy/.dnx/dnvm/dnvm.sh' to start using dnvm"`

Install DNX for .net core
`dnvm upgrade -r coreclr`

Get required .net packages
`DNU restore`

run npm to get front end packages
`npm install`

Run grunt to build solution and start localhost
`grunt`

Further details
https://docs.asp.net/en/latest/getting-started/installing-on-mac.html
## Installation
