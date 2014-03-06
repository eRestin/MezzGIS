from flexipage.forms import FlexiModelForm
from mezzanine.core.forms import Html5Mixin
from django import forms

from models import Feedback

class FeedbackForm(FlexiModelForm, Html5Mixin):
    class Meta:
        model = Feedback
    name = forms.CharField(widget=forms.TextInput(attrs = {'placeholder': 'Name', 'class': 'namesclass'}), label='')
    email = forms.CharField(widget=forms.TextInput(attrs = {'placeholder': 'E-Mail', 'class': 'emailclass'}), label='')
    telephone = forms.CharField(widget=forms.TextInput(attrs = {'placeholder': 'Telephone', 'class': 'telephoneclass'}), label='')
    address = forms.CharField(widget=forms.TextInput(attrs = {'placeholder': 'Address', 'class': 'addressclass'}), label='')
    content = forms.CharField(widget=forms.Textarea(attrs = {'placeholder': 'Enquiry', 'rows': 4, 'cols': 40, 'class': 'contentsclass'}), label='')