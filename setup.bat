cd api
pip3 install virtualenv
virtualenv venv
start cmd /c venv\\Scripts\\pip3 install -r requirements.txt
cd ../ui
start cmd /c npm install
cd ..
