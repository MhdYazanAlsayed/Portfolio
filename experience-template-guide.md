# 🚀 Experience Page Template Guide

## Overview

This guide explains how to create individual experience pages using the provided template system. Each experience gets its own dedicated page with full control over content, code snippets, and presentation.

## Files Created

### 1. `experience-template.html` - Template File

- **Purpose**: Base template for creating new experience pages
- **Usage**: Copy this file and customize it for each experience
- **Features**: All sections and placeholders ready for customization

### 2. `qservs-experience.html` - Example Implementation

- **Purpose**: Complete example of how to use the template
- **Content**: Real QServs experience with actual code snippets
- **Reference**: Use this as a guide for your own experiences

### 3. `experience-template-guide.md` - This Guide

- **Purpose**: Step-by-step instructions for using the template
- **Content**: Complete documentation and examples

## How to Create a New Experience Page

### Step 1: Copy the Template

```bash
# Copy the template file
cp experience-template.html my-experience.html
```

### Step 2: Replace Placeholders

The template uses placeholders in `[BRACKETS]` that you need to replace:

#### Header Section

```html
<!-- Replace these placeholders -->
[EXPERIENCE_TITLE] → "Software Engineer | Full Stack Developer" [COMPANY_NAME] →
"Your Company" [LOCATION] → "Remote" [JOB_TYPE] → "Full Time" [DURATION] → "Jan
2023 - Dec 2024"
```

#### Code Snippets

```html
<!-- Replace these placeholders -->
[CODE_SNIPPET_1_TITLE] → "Authentication Service" [CODE_SNIPPET_1_DESCRIPTION] →
"JWT-based authentication with role management" [LANGUAGE] → "csharp" (or
"javascript", "python", etc.) [CODE_SNIPPET_1_CONTENT] → Your actual code here
```

#### Skills Section

```html
<!-- Replace these placeholders -->
[TECH_1] → "C#" [TECH_2] → "ASP.NET Core" [TECH_3] → "SQL Server" [TECH_4] →
"Azure" [TECH_5] → "React.js"
```

#### Metrics Section

```html
<!-- Replace these placeholders -->
[METRIC_1_LABEL] → "System Uptime" [METRIC_1_VALUE] → "99.9%"
[METRIC_1_PERCENTAGE] → "99"
```

### Step 3: Customize Content Sections

#### Overview Section

Replace the placeholder content with your actual experience details:

```html
<div class="card-body">
  <!-- Replace this entire section with your content -->
  <h4>Project Background</h4>
  <p>Your project background...</p>

  <h4>My Role</h4>
  <p>Your role and responsibilities...</p>

  <h4>Key Challenges</h4>
  <ul>
    <li>Challenge 1</li>
    <li>Challenge 2</li>
  </ul>
</div>
```

#### Code Snippets Section

Add your actual code snippets:

```html
<div class="code-snippet mb-4">
  <div class="code-snippet-header">
    <h5 class="mb-2"><i class="fas fa-code"></i> Your Code Title</h5>
    <p class="text-muted mb-3">Description of what this code does</p>
  </div>
  <div class="code-snippet-body">
    <div class="code-toolbar">
      <span class="language-badge badge badge-cyan">C#</span>
      <button
        class="btn btn-sm btn-outline-light copy-btn"
        onclick="copyCode(0)"
      >
        <i class="fas fa-copy"></i> Copy
      </button>
    </div>
    <pre
      class="line-numbers"
    ><code class="language-csharp">// Your actual code here
public class MyClass
{
    public void MyMethod()
    {
        // Implementation
    }
}</code></pre>
  </div>
</div>
```

### Step 4: Update Page Title

```html
<title>🚀 [Your Experience Title] - Yazan Portfolio</title>
```

### Step 5: Add to Navigation

Update your main page to link to the new experience page:

```html
<a href="my-experience.html" class="btn-lime btn-sm text-white">View Details</a>
```

## Template Sections Explained

### 1. Header Section

- **Experience title**: Main job title
- **Badges**: Company, location, type, duration
- **Back button**: Returns to main page

### 2. Overview Section

- **Project background**: Context and goals
- **Your role**: Responsibilities and contributions
- **Challenges**: Problems you solved
- **Solutions**: How you solved them

### 3. Code Snippets Section

- **Multiple code blocks**: Show your best work
- **Syntax highlighting**: Automatic with Prism.js
- **Copy functionality**: Users can copy your code
- **Language badges**: Shows the technology used

### 4. Technical Achievements Section

- **Key accomplishments**: What you achieved
- **Impact metrics**: Quantifiable results
- **Star icons**: Visual emphasis

### 5. Sidebar Sections

#### Technologies Used

- **Skill badges**: Color-coded technology tags
- **Icons**: Visual representation of each tech

#### Impact Metrics

- **Progress bars**: Visual representation of achievements
- **Color coding**: Different colors for different metrics

#### Related Projects

- **Project links**: Other work related to this experience
- **Descriptions**: Brief project overviews

#### Timeline

- **Chronological order**: Key milestones and dates
- **Visual timeline**: Connected dots showing progression

## Code Snippet Guidelines

### Supported Languages

- `csharp` - C# code
- `javascript` - JavaScript/TypeScript
- `python` - Python code
- `sql` - SQL queries
- `html` - HTML markup
- `css` - CSS styles
- `json` - JSON data
- `xml` - XML markup

### Code Formatting Tips

1. **Use proper indentation**: 2 or 4 spaces consistently
2. **Include comments**: Explain complex logic
3. **Show complete methods**: Don't truncate important code
4. **Use meaningful names**: Clear variable and method names
5. **Add context**: Explain what the code does

### Code Snippet Sizing Options

You can control the height of code snippets using these CSS classes:

#### Available Size Classes:

- `code-snippet-sm` - **300px height** (for short code snippets)
- `code-snippet-md` - **500px height** (default, good for most code)
- `code-snippet-lg` - **700px height** (for longer code blocks)
- `code-snippet-xl` - **900px height** (for very long code)
- `code-snippet-full` - **No height limit** (shows all code without scrolling)

#### Usage Examples:

```html
<!-- Small code snippet -->
<div class="code-snippet code-snippet-sm mb-4">
  <!-- Your code content -->
</div>

<!-- Medium code snippet (default) -->
<div class="code-snippet code-snippet-md mb-4">
  <!-- Your code content -->
</div>

<!-- Large code snippet -->
<div class="code-snippet code-snippet-lg mb-4">
  <!-- Your code content -->
</div>

<!-- Extra large code snippet -->
<div class="code-snippet code-snippet-xl mb-4">
  <!-- Your code content -->
</div>

<!-- Full height (no scrolling) -->
<div class="code-snippet code-snippet-full mb-4">
  <!-- Your code content -->
</div>
```

#### Scrollbar Features:

- **Custom styled scrollbars** with space theme colors
- **Smooth scrolling** with gradient thumb
- **Hover effects** on scrollbar
- **Cross-browser support** (Chrome, Firefox, Safari)
- **Responsive design** that works on all devices

### Example Code Snippet

```html
<div class="code-snippet mb-4">
  <div class="code-snippet-header">
    <h5 class="mb-2">
      <i class="fas fa-code"></i> User Authentication Service
    </h5>
    <p class="text-muted mb-3">JWT-based authentication with role-based access control</p>
  </div>
  <div class="code-snippet-body">
    <div class="code-toolbar">
      <span class="language-badge badge badge-cyan">C#</span>
      <button class="btn btn-sm btn-outline-light copy-btn" onclick="copyCode(0)">
        <i class="fas fa-copy"></i> Copy
      </button>
    </div>
    <pre class="line-numbers"><code class="language-csharp">public class AuthenticationService
{
    public async Task<AuthResult> AuthenticateAsync(string email, string password)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user == null)
            return AuthResult.Failed("Invalid credentials");

        var isValidPassword = _passwordHasher.VerifyPassword(password, user.PasswordHash);
        if (!isValidPassword)
            return AuthResult.Failed("Invalid credentials");

        var token = GenerateJwtToken(user);
        return AuthResult.Success(token, user);
    }
}</code></pre>
  </div>
</div>
```

## Badge Color Options

### Available Badge Classes

- `badge-lavender` - Purple theme
- `badge-cyan` - Blue theme
- `badge-gold` - Gold theme
- `badge-magenta` - Pink theme
- `badge-lime` - Green theme
- `badge-holographic` - Rainbow theme
- `badge-neural` - Neural theme
- `badge-quantum` - Quantum theme

### Usage Examples

```html
<!-- Technology badges -->
<span class="badge badge-magenta badge-icon">
  <i class="fas fa-code"></i> C#
</span>

<!-- Metric badges -->
<span class="badge badge-lime">99.9%</span>

<!-- Status badges -->
<span class="badge badge-gold">Full Time</span>
```

## Best Practices

### Content Guidelines

1. **Be specific**: Use concrete examples and metrics
2. **Show impact**: Quantify your achievements
3. **Tell a story**: Explain the problem, solution, and results
4. **Use real code**: Show actual code you wrote
5. **Keep it current**: Update with recent experiences

### Design Guidelines

1. **Consistent styling**: Use the provided CSS classes
2. **Proper spacing**: Maintain consistent margins and padding
3. **Color coordination**: Use the space theme colors
4. **Responsive design**: Test on different screen sizes
5. **Loading performance**: Optimize images and code snippets

### Technical Guidelines

1. **Valid HTML**: Ensure proper markup structure
2. **Accessible**: Use proper semantic elements
3. **SEO friendly**: Include relevant meta tags
4. **Fast loading**: Optimize code snippets and images
5. **Cross-browser**: Test in different browsers

## File Structure

```
your-portfolio/
├── experience-template.html          # Template file
├── qservs-experience.html           # Example implementation
├── samasoft-experience.html         # Your SamaSoft experience
├── my-other-experience.html         # Additional experiences
├── experience-template-guide.md     # This guide
└── styles.css                       # Shared styles
```

## Next Steps

1. **Create your first experience page** using the template
2. **Customize the content** with your actual experience details
3. **Add real code snippets** from your work
4. **Test the page** in different browsers and devices
5. **Link from your main page** to the new experience page
6. **Create additional pages** for other experiences

## Support

If you need help with the template:

1. **Check the example**: Look at `qservs-experience.html`
2. **Read this guide**: Follow the step-by-step instructions
3. **Test incrementally**: Build and test each section
4. **Use browser dev tools**: Debug any issues

The template system gives you complete control over each experience page while maintaining consistency with your space theme design! 🚀
