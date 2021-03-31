package com.example.webdevspring21ojastserverjava.services;

import com.example.webdevspring21ojastserverjava.models.Widget;
import org.springframework.stereotype.Service;
import com.example.webdevspring21ojastserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
//        widget.setId((new Date()).getTime());
//        widgets.add(widget);
//        return widget;
    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
//        return widgets;
    }
    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
//        List<Widget> ws = new ArrayList<>();
//        for(Widget w: widgets) {
//            if(w.getTopicId().equals(topicId)) {
//                ws.add(w);
//            }
//        }
//        return ws;
    }

    public Widget findWidgetById(Long id){
        return repository.findById(id).get();
    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
//        int index = -1;
//        for(int i=0; i<widgets.size(); i++) {
//            if(widgets.get(i).getId().equals(id)) {
//                index = i;
//                widgets.remove(index);
//                return 1;
//            }
//        }
        return 1;
    }

    public Integer updateWidget(Long id, Widget widget) {
        Widget originalWidget = findWidgetById(id);

        originalWidget.setText(widget.getText());
        originalWidget.setType(widget.getType());
        originalWidget.setSize(widget.getSize());
        originalWidget.setWidth(widget.getWidth());
        originalWidget.setHeight(widget.getHeight());
        originalWidget.setUrl(widget.getUrl());
        originalWidget.setOrdered(widget.getOrdered());

        repository.save(originalWidget);
        return 1;
//        for(int i=0; i<widgets.size(); i++) {
//            if(widgets.get(i).getId().equals(id)) {
//                widgets.set(i, widget);
//                return 1;
//            }
//        }
//        return -1;
    }
}
