from flexipage.forms import FlexiModelForm

from models import Feedback

class FeedbackForm(FlexiModelForm):
    class Meta:
        model = Feedback
