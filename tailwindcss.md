# Tailwind CSS Guide for Video Player Components

This guide explains how to replace custom CSS with Tailwind CSS classes for better maintainability.

## Placeholder Styling in Tailwind

Instead of using custom CSS for placeholder text:

```css
.comment-form-textarea::placeholder {
  color: rgb(148 163 184); /* text-slate-400 */
  opacity: 0.8;
}
```

### Tailwind Solution:

Use the placeholder modifier:
```html
<textarea className="placeholder:text-slate-400 placeholder:opacity-80">
  <!-- Content -->
</textarea>
```

## Custom Scrollbars in Tailwind

Instead of using custom CSS for scrollbars:

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(249, 115, 22, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(249, 115, 22, 0.5);
}
```

### Tailwind Solution:

**Option 1: Use the `@tailwind` directive with a plugin**

1. Install the tailwind-scrollbar plugin:
```
npm install tailwind-scrollbar
```

2. Add to your `tailwind.config.js`:
```js
module.exports = {
  // ...other config
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
```

3. Use these classes in your HTML:
```html
<div class="scrollbar scrollbar-thin scrollbar-thumb-orange-600/30 scrollbar-track-slate-900/30 hover:scrollbar-thumb-orange-600/50">
  <!-- Content -->
</div>
```

## Animations in Tailwind

Instead of custom animation CSS:

```css
@keyframes fadeInSlideUp {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-fade-in {
  animation: fadeInSlideUp 0.3s ease-out forwards;
}
```

### Tailwind Solution:

**Option 1: Use built-in Tailwind animations**

For fade-in and slide-up effects, use these classes:
```html
<div class="animate-fade-in-up">Content</div>
```

Define in your `tailwind.config.js`:
```js
module.exports = {
  // ...other config
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  }
}
```

## Delayed Animations

Instead of inline styles for animation delays:
```jsx
<div style={{ animationDelay: `${index * 100}ms` }}>
```

### Tailwind Solution:

Add delay utilities to `tailwind.config.js`:
```js
module.exports = {
  // ...other config
  theme: {
    extend: {
      transitionDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      }
    }
  }
}
```

Use in your components:
```html
<!-- For first item -->
<div class="animate-fade-in-up delay-0">Item 1</div>
<!-- For second item -->
<div class="animate-fade-in-up delay-100">Item 2</div>
<!-- For third item -->
<div class="animate-fade-in-up delay-200">Item 3</div>
```

## Converting Custom Slide/Fade Animations

For these custom animations:
```css
.animate-in.fade-in-50 {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.animate-in.slide-in-from-top-2 {
  animation: slideInFromTop 0.3s ease-out forwards;
  transform: translateY(-8px);
}
```

### Tailwind Solution:

Add to your `tailwind.config.js`:
```js
module.exports = {
  // ...other config
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          to: { opacity: '1' }
        },
        slideDown: {
          to: { transform: 'translateY(0)' }
        }
      }
    }
  }
}
```

Use in your components:
```html
<div class="opacity-0 animate-fade-in">Fades In</div>
<div class="-translate-y-2 animate-slide-down">Slides Down</div>
```

## Example Implementation:

Here's how to modify the VideoPlayerPage component to use Tailwind-only approach:

1. Replace custom scrollbar:
```jsx
<div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar scrollbar-thin scrollbar-thumb-orange-600/30 scrollbar-track-slate-900/30">
```

2. Replace custom animations:
```jsx
<div className="animate-fade-in-up delay-100">
  <VideoCommentCard data={comment} videoId={videoId} />
</div>
```

3. Replace slide animations:
```jsx
<div className="opacity-0 -translate-y-2 animate-slide-down">
  {/* Comments content */}
</div>
```

By applying these Tailwind classes instead of custom CSS, your code becomes more maintainable and easier to understand at a glance.
