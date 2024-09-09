from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required
def news_page(request):
    return render(request, 'news/news_list.html', context={'page_title': 'Новости'})
