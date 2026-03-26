<script setup lang="ts">
import { computed, ref } from 'vue-lynx';

import './App.css';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type Filter = 'all' | 'active' | 'done';

const todos = ref<Todo[]>([]);
const newTodo = ref('');
const filter = ref<Filter>('all');
let nextId = 1;

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter((t) => !t.done);
  if (filter.value === 'done') return todos.value.filter((t) => t.done);
  return todos.value;
});

const doneCount = computed(
  () => todos.value.filter((t) => t.done).length,
);

const totalCount = computed(() => todos.value.length);

const progressPercent = computed(() => {
  if (totalCount.value === 0) return 0;
  return Math.round((doneCount.value / totalCount.value) * 100);
});

function addTodo() {
  const text = newTodo.value.trim();
  if (!text) return;
  todos.value.unshift({ id: nextId++, text, done: false });
  newTodo.value = '';
}

function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) todo.done = !todo.done;
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id);
}

function onInput(e: { detail: { value: string } }) {
  newTodo.value = e.detail.value;
}

function setFilter(f: Filter) {
  filter.value = f;
}
</script>

<template>
  <view class="min-h-screen bg-bg flex flex-col">
    <!-- Header section -->
    <view class="flex flex-col px-6 pt-16 pb-4">
      <!-- Title row -->
      <view class="flex flex-row items-center justify-between mb-2">
        <view class="flex flex-col">
          <text class="text-sm text-txt-muted font-medium" style="letter-spacing: 2px">
            MY TASKS
          </text>
          <text class="text-3xl font-bold text-txt mt-1">
            Todo List
          </text>
        </view>
        <view class="flex flex-col items-center justify-center w-14 h-14 rounded-full" style="background-color: rgba(249, 112, 102, 0.12)">
          <text class="text-2xl font-bold text-coral">
            {{ totalCount }}
          </text>
        </view>
      </view>

      <!-- Progress bar -->
      <view v-if="totalCount > 0" class="flex flex-col mt-4 mb-1">
        <view class="flex flex-row items-center justify-between mb-2">
          <text class="text-xs text-txt-muted">Progress</text>
          <text class="text-xs font-semibold text-teal">
            {{ progressPercent }}%
          </text>
        </view>
        <view class="progress-track">
          <view
            class="progress-fill"
            :style="{ width: `${progressPercent}%` }"
          />
        </view>
      </view>
    </view>

    <!-- Input area -->
    <view class="px-6 pt-3 pb-2">
      <view
        class="flex flex-row items-center rounded-2xl bg-bg-input input-glow"
      >
        <x-input
          class="flex-1 h-14 text-txt text-base"
          style="padding-left: 20px; padding-right: 12px"
          :value="newTodo"
          placeholder="What's on your mind?"
          placeholder-style="color: #78716c"
          confirm-type="done"
          @input="onInput"
          @confirm="addTodo"
        />
        <view
          class="w-11 h-11 rounded-xl flex items-center justify-center mr-1 tab-active"
          @tap="addTodo"
        >
          <text class="text-white text-xl font-bold" style="line-height: 24px">+</text>
        </view>
      </view>
    </view>

    <!-- Filter tabs -->
    <view class="flex flex-row justify-center gap-2 px-6 pt-4 pb-3">
      <view
        :class="[
          'px-5 py-2 rounded-xl',
          filter === 'all' ? 'tab-active' : 'bg-bg-elevated',
        ]"
        @tap="() => setFilter('all')"
      >
        <text
          :class="[
            'text-sm font-semibold',
            filter === 'all' ? 'text-white' : 'text-txt-muted',
          ]"
        >
          All
        </text>
      </view>
      <view
        :class="[
          'px-5 py-2 rounded-xl',
          filter === 'active' ? 'tab-active' : 'bg-bg-elevated',
        ]"
        @tap="() => setFilter('active')"
      >
        <text
          :class="[
            'text-sm font-semibold',
            filter === 'active' ? 'text-white' : 'text-txt-muted',
          ]"
        >
          Active
        </text>
      </view>
      <view
        :class="[
          'px-5 py-2 rounded-xl',
          filter === 'done' ? 'tab-active' : 'bg-bg-elevated',
        ]"
        @tap="() => setFilter('done')"
      >
        <text
          :class="[
            'text-sm font-semibold',
            filter === 'done' ? 'text-white' : 'text-txt-muted',
          ]"
        >
          Done
        </text>
      </view>
    </view>

    <!-- Divider -->
    <view class="mx-6 mb-3" style="height: 1px; background-color: #292524" />

    <!-- Todo items -->
    <scroll-view class="flex-1 px-6" scroll-orientation="vertical">
      <view
        v-for="(todo, index) in filteredTodos"
        :key="todo.id"
        :class="[
          'flex flex-row items-center rounded-2xl px-4 py-4',
          index < filteredTodos.length - 1 ? 'mb-3' : '',
          todo.done ? 'bg-bg-card-done card-border-done' : 'bg-bg-card card-border-active',
        ]"
      >
        <!-- Checkbox -->
        <view
          :class="[
            'w-7 h-7 rounded-full mr-4 flex items-center justify-center',
            todo.done
              ? 'check-done'
              : '',
          ]"
          :style="todo.done ? {} : { borderWidth: '2px', borderStyle: 'solid', borderColor: '#44403c' }"
          @tap="() => toggleTodo(todo.id)"
        >
          <text v-if="todo.done" class="text-white text-xs font-bold">
            &#10003;
          </text>
        </view>

        <!-- Task text -->
        <text
          :class="[
            'flex-1 text-base',
            todo.done ? 'text-txt-done line-through' : 'text-txt',
          ]"
          @tap="() => toggleTodo(todo.id)"
        >
          {{ todo.text }}
        </text>

        <!-- Delete -->
        <view
          class="w-8 h-8 rounded-xl flex items-center justify-center"
          style="background-color: rgba(239, 68, 68, 0.08)"
          @tap="() => deleteTodo(todo.id)"
        >
          <text class="text-danger text-xs font-bold">&#10005;</text>
        </view>
      </view>

      <!-- Empty state -->
      <view
        v-if="filteredTodos.length === 0"
        class="flex flex-col items-center justify-center pt-20"
      >
        <view
          class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style="background-color: rgba(249, 112, 102, 0.08)"
        >
          <text class="text-2xl text-coral">&#9745;</text>
        </view>
        <text class="text-base text-txt-muted mb-1">
          {{
            filter === 'all'
              ? 'No tasks yet'
              : filter === 'active'
                ? 'All done!'
                : 'Nothing completed'
          }}
        </text>
        <text class="text-sm text-txt-muted" style="opacity: 0.6">
          {{
            filter === 'all'
              ? 'Type above to add your first task'
              : filter === 'active'
                ? 'You\'ve finished everything'
                : 'Complete a task to see it here'
          }}
        </text>
      </view>

      <!-- Bottom spacer -->
      <view style="height: 24px" />
    </scroll-view>
  </view>
</template>
