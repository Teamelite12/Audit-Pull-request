(function () {
    'use strict';

    var form = document.getElementById('task-form');
    var input = document.getElementById('task-input');
    var list = document.getElementById('task-list');
    var count = document.getElementById('task-count');

    var tasks = [];
    var nextId = 1;

    function updateCount() {
        var remaining = tasks.filter(function (task) {
            return !task.done;
        }).length;
        count.textContent = tasks.length + (tasks.length === 1 ? ' task' : ' tasks') +
            ' (' + remaining + ' remaining)';
    }

    function createItem(task) {
        var item = document.createElement('li');
        item.dataset.id = String(task.id);
        if (task.done) {
            item.classList.add('done');
        }

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', function () {
            task.done = checkbox.checked;
            item.classList.toggle('done', task.done);
            updateCount();
        });

        var text = document.createElement('span');
        text.className = 'task-text';
        text.textContent = task.text;

        var remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'delete';
        remove.textContent = 'Delete';
        remove.addEventListener('click', function () {
            tasks = tasks.filter(function (candidate) {
                return candidate.id !== task.id;
            });
            item.remove();
            updateCount();
        });

        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(remove);
        return item;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var value = input.value.trim();
        if (!value) {
            return;
        }

        var task = { id: nextId++, text: value, done: false };
        tasks.push(task);
        list.appendChild(createItem(task));

        input.value = '';
        input.focus();
        updateCount();
    });

    updateCount();
}());
