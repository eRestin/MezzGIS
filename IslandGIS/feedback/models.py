from django.db.models import Model, TextField, CharField

class Feedback(Model):
    name    = CharField(max_length=1024)
    email   = CharField(max_length=1024)
    content = TextField()

    def __unicode__(self):
        return "%s (%s)" % (self.name, self.email)
