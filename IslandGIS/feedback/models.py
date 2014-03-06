from django.db.models import Model, TextField, CharField, DecimalField

class Feedback(Model):
    name    = CharField(max_length=1024)
    email   = CharField(max_length=1024)
    telephone = DecimalField(max_digits=19, decimal_places=10)
    content = TextField()

    def __unicode__(self):
        return "%s (%s)" % (self.name, self.email)
