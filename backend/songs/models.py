from django.db import models


SongTypes = [('None', 'None'),('pop','pop'), ('rock','rock'),('hiphop','hip hop'), ('jazz','jazz'), ('country','country'),('electronic','electronic'), ('classical','classical')]
moodTypes = [('happy','happy'), ('confused','confused'), ('proud','proud'), ('relaxed','relaxed'), ('unamused','unameused')]
# Create your models here.
class Songs(models.Model):
    name = models.CharField(max_length=100)
    period = models.DateField(blank=True)
    singer = models.CharField(max_length=100)
    style = models.CharField(choices=SongTypes, default='None', max_length=20)
    mood = models.CharField(choices=moodTypes, default='happy', max_length=20)

    def __str__(self):
        return self.name
    
class Queries(models.Model):
    singer = models.CharField(max_length=100, default='')
    mood = models.CharField(choices=moodTypes, default='happy', max_length=20)
    text = models.CharField(max_length=200, default='') 
    #period = models.CharField(max_length=200, default='')
    #query = models.JSONField(null=True)
    def __str__(self) -> str:
        return "query: " 