package com.example.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.widget.RemoteViews;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.CustomTarget;
import com.bumptech.glide.request.transition.Transition;

public class MyWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_widget_layout);
            views.setTextViewText(R.id.textView, "¡Hola desde el widget!");

            // Cargar imagen desde URL con Glide
            String imageUrl = "https://via.placeholder.com/150"; // Reemplaza con tu URL real

            Glide.with(context)
                .asBitmap()
                .load(imageUrl)
                .into(new CustomTarget<Bitmap>() {
                    @Override
                    public void onResourceReady(Bitmap resource, Transition<? super Bitmap> transition) {
                        views.setImageViewBitmap(R.id.imageView, resource);
                        appWidgetManager.updateAppWidget(appWidgetId, views);
                    }

                    @Override
                    public void onLoadCleared(Drawable placeholder) {
                        // No se usa en widgets
                    }
                });
        }
    }
}
