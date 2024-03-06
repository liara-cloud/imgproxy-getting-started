## Installation (locally)

```
git clone https://github.com/liara-cloud/imgproxy-getting-started.git
```

```
cd imgproxy-getting-started.git
```

```
pip install virtualenv
```

```
python -m venv .venv
```

```
source .venv/Scripts/Activate # .venv\Scripts\Activate in Windows
```

```
pip install -r requirements.txt
```

- set ENDPOINT & IMGPROXY_URL variables in uploadimage/settings.py (which both vars must be locally)

```
python manage.py makemigrations
```

```
python manage.py migrate
```

```
python manage.py runserver
```
