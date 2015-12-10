## Installation

Install .net version manager (DNVM)  
curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.sh | DNX_BRANCH=dev sh && source ~/.dnx/dnvm/dnvm.sh

Install DNX for .net core  
dnvm upgrade -r coreclr

Get required .net packages  
DNU restore

run npm to get front end packages  
npm install

Run grunt to build solution and start localhost  
grunt

Further details
https://docs.asp.net/en/latest/getting-started/installing-on-mac.html  
https://docs.asp.net/en/latest/tutorials/your-first-mac-aspnet.html  
