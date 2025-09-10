// Experience Details Manager
class ExperienceDetailsManager {
  constructor() {
    this.experienceId = null;
    this.experience = null;
    this.codeSnippets = [];
  }

  // Initialize the page
  async init() {
    // Get experience ID from URL parameters
    this.experienceId = this.getExperienceIdFromUrl();

    if (!this.experienceId) {
      this.showError("No experience ID provided");
      return;
    }

    // Load experience data
    await this.loadExperienceData();

    if (this.experience) {
      this.renderExperienceDetails();
      this.loadCodeSnippets();
    } else {
      this.showError("Experience not found");
    }
  }

  // Get experience ID from URL
  getExperienceIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  // Load experience data from JSON
  async loadExperienceData() {
    try {
      const response = await fetch("./experiences.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.experience = data.experiences.find(
        (exp) => exp.id == this.experienceId
      );
    } catch (error) {
      console.error("Error loading experience data:", error);
    }
  }

  // Format date for display
  formatDate(dateString) {
    if (dateString === "present") return "Present";
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  // Create badge element
  createBadge(text, badgeClass, icon = null) {
    const badge = document.createElement("span");
    badge.className = `badge ${badgeClass} badge-icon`;

    if (icon) {
      const iconElement = document.createElement("i");
      iconElement.className = icon;
      badge.appendChild(iconElement);
    }

    badge.appendChild(document.createTextNode(` ${text}`));
    return badge;
  }

  // Render experience details
  renderExperienceDetails() {
    // Update page title
    document.title = `${this.experience.title} - Yazan Portfolio`;

    // Update header
    document.getElementById("experience-title").textContent =
      this.experience.company;
    document.getElementById("experience-company").textContent =
      this.experience.title;
    document.getElementById("experience-location").textContent =
      this.experience.location;
    document.getElementById("experience-type").textContent =
      this.experience.type;
    document.getElementById(
      "experience-duration"
    ).textContent = `${this.formatDate(
      this.experience.startDate
    )} - ${this.formatDate(this.experience.endDate)}`;

    // Update description
    document.getElementById("experience-description").innerHTML =
      this.experience.description.about;

    // Render skills
    this.renderSkills();

    // Render achievements
    this.renderAchievements();

    // Render metrics
    this.renderMetrics();

    // Render related projects
    this.renderRelatedProjects();
  }

  // Render skills
  renderSkills() {
    const container = document.getElementById("skills-container");
    container.innerHTML = "";

    this.experience.description.skills.forEach((skill) => {
      const badge = this.createBadge(skill.name, skill.badge);
      container.appendChild(badge);
    });
  }

  // Render achievements
  renderAchievements() {
    const container = document.getElementById("achievements");
    const achievements = this.experience.description.achievements || [];

    if (achievements.length === 0) {
      container.innerHTML =
        '<p class="text-muted">No specific achievements listed.</p>';
      return;
    }

    container.innerHTML = "";
    achievements.forEach((achievement) => {
      const achievementElement = document.createElement("div");
      achievementElement.className = "achievement-item mb-3";
      achievementElement.innerHTML = `
        <div class="d-flex align-items-start">
          <i class="fas fa-star text-warning me-2 mt-1"></i>
          <div>
            <h5 class="mb-1">${achievement.title}</h5>
            <p class="mb-0 text-muted">${achievement.description}</p>
          </div>
        </div>
      `;
      container.appendChild(achievementElement);
    });
  }

  // Render metrics
  renderMetrics() {
    const container = document.getElementById("metrics-container");
    const metrics = this.experience.description.metrics || [];

    if (metrics.length === 0) {
      container.innerHTML = '<p class="text-muted">No metrics available.</p>';
      return;
    }

    container.innerHTML = "";
    metrics.forEach((metric) => {
      const metricElement = document.createElement("div");
      metricElement.className = "metric-item mb-3";
      metricElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <span class="metric-label">${metric.label}</span>
          <span class="metric-value badge badge-${metric.badge || "cyan"}">${
        metric.value
      }</span>
        </div>
        <div class="progress mt-2" style="height: 4px;">
          <div class="progress-bar bg-${
            metric.badge || "cyan"
          }" style="width: ${metric.percentage || 100}%"></div>
        </div>
      `;
      container.appendChild(metricElement);
    });
  }

  // Render related projects
  renderRelatedProjects() {
    const container = document.getElementById("related-projects");
    const projects = this.experience.description.relatedProjects || [];

    if (projects.length === 0) {
      container.innerHTML =
        '<p class="text-muted">No related projects listed.</p>';
      return;
    }

    container.innerHTML = "";
    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.className = "related-project mb-3";
      projectElement.innerHTML = `
        <div class="d-flex align-items-center">
          <i class="fas fa-folder text-primary me-2"></i>
          <div>
            <h6 class="mb-1">${project.name}</h6>
            <small class="text-muted">${project.description}</small>
          </div>
        </div>
      `;
      container.appendChild(projectElement);
    });
  }

  // Load code snippets
  loadCodeSnippets() {
    const container = document.getElementById("code-snippets");

    // Sample code snippets - you can expand this with real code
    const snippets = this.getCodeSnippetsForExperience();

    if (snippets.length === 0) {
      container.innerHTML =
        '<p class="text-muted">No code snippets available for this experience.</p>';
      return;
    }

    container.innerHTML = "";
    snippets.forEach((snippet, index) => {
      const snippetElement = this.createCodeSnippet(snippet, index);
      container.appendChild(snippetElement);
    });

    // Re-highlight code after adding to DOM
    setTimeout(() => {
      Prism.highlightAll();
    }, 100);
  }

  // Get code snippets based on experience
  getCodeSnippetsForExperience() {
    const snippets = {
      1: [
        // SamaSoft experience
        {
          title: "HR Management System - User Authentication",
          description:
            "Implemented secure user authentication with role-based access control",
          language: "csharp",
          code: `public class AuthenticationService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    
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
    
    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}`,
        },
        {
          title: "Restaurant Management - Order Processing",
          description: "Real-time order processing with inventory management",
          language: "csharp",
          code: `public class OrderService : IOrderService
{
    public async Task<OrderResult> ProcessOrderAsync(OrderRequest request)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // Validate inventory
            var inventoryCheck = await ValidateInventoryAsync(request.Items);
            if (!inventoryCheck.IsValid)
                return OrderResult.Failed(inventoryCheck.ErrorMessage);
            
            // Create order
            var order = new Order
            {
                Id = Guid.NewGuid(),
                CustomerId = request.CustomerId,
                Items = request.Items,
                TotalAmount = CalculateTotal(request.Items),
                Status = OrderStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };
            
            await _context.Orders.AddAsync(order);
            
            // Update inventory
            await UpdateInventoryAsync(request.Items);
            
            // Send notification
            await _notificationService.SendOrderConfirmationAsync(order);
            
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            
            return OrderResult.Success(order);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error processing order");
            return OrderResult.Failed("Order processing failed");
        }
    }
}`,
        },
      ],
      2: [
        // QServs experience
        {
          title: "Gas Station Management - Fuel Monitoring",
          description: "Real-time fuel level monitoring with automated alerts",
          language: "csharp",
          code: `public class FuelMonitoringService : IFuelMonitoringService
{
    private readonly IHubContext<FuelHub> _hubContext;
    private readonly ILogger<FuelMonitoringService> _logger;
    
    public async Task MonitorFuelLevelsAsync()
    {
        var stations = await _context.GasStations
            .Include(s => s.Tanks)
            .Where(s => s.IsActive)
            .ToListAsync();
            
        foreach (var station in stations)
        {
            foreach (var tank in station.Tanks)
            {
                var currentLevel = await GetCurrentFuelLevelAsync(tank.Id);
                var percentage = (currentLevel / tank.Capacity) * 100;
                
                // Update database
                tank.CurrentLevel = currentLevel;
                tank.LastUpdated = DateTime.UtcNow;
                
                // Check for low fuel alerts
                if (percentage < tank.LowFuelThreshold)
                {
                    await SendLowFuelAlertAsync(station, tank, percentage);
                }
                
                // Real-time updates to connected clients
                await _hubContext.Clients.Group($"station-{station.Id}")
                    .SendAsync("FuelLevelUpdate", new
                    {
                        TankId = tank.Id,
                        Level = currentLevel,
                        Percentage = percentage,
                        Timestamp = DateTime.UtcNow
                    });
            }
        }
        
        await _context.SaveChangesAsync();
    }
    
    private async Task SendLowFuelAlertAsync(GasStation station, FuelTank tank, double percentage)
    {
        var alert = new FuelAlert
        {
            StationId = station.Id,
            TankId = tank.Id,
            AlertType = AlertType.LowFuel,
            Message = $"Tank {tank.Name} is at {percentage:F1}% capacity",
            Severity = percentage < 10 ? AlertSeverity.Critical : AlertSeverity.Warning,
            Timestamp = DateTime.UtcNow
        };
        
        await _context.FuelAlerts.AddAsync(alert);
        
        // Send notifications
        await _notificationService.SendAlertAsync(alert);
        await _hubContext.Clients.Group($"station-{station.Id}")
            .SendAsync("FuelAlert", alert);
    }
}`,
        },
        {
          title: "Payment Processing Integration",
          description: "Secure payment processing with multiple providers",
          language: "csharp",
          code: `public class PaymentService : IPaymentService
{
    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        try
        {
            var paymentProvider = GetPaymentProvider(request.Provider);
            var encryptedData = EncryptPaymentData(request);
            
            var response = await paymentProvider.ProcessPaymentAsync(encryptedData);
            
            if (response.IsSuccessful)
            {
                var transaction = new Transaction
                {
                    Id = Guid.NewGuid(),
                    StationId = request.StationId,
                    Amount = request.Amount,
                    Provider = request.Provider,
                    TransactionId = response.TransactionId,
                    Status = TransactionStatus.Completed,
                    ProcessedAt = DateTime.UtcNow
                };
                
                await _context.Transactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
                
                // Update station revenue
                await UpdateStationRevenueAsync(request.StationId, request.Amount);
                
                return PaymentResult.Success(transaction);
            }
            else
            {
                return PaymentResult.Failed(response.ErrorMessage);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Payment processing failed for station {StationId}", request.StationId);
            return PaymentResult.Failed("Payment processing failed");
        }
    }
    
    private string EncryptPaymentData(PaymentRequest request)
    {
        var data = JsonSerializer.Serialize(new
        {
            CardNumber = MaskCardNumber(request.CardNumber),
            Amount = request.Amount,
            Currency = request.Currency,
            Timestamp = DateTime.UtcNow
        });
        
        return _encryptionService.Encrypt(data);
    }
}`,
        },
      ],
    };

    return snippets[this.experienceId] || [];
  }

  // Create code snippet element
  createCodeSnippet(snippet, index) {
    const snippetElement = document.createElement("div");
    snippetElement.className = "code-snippet mb-4";
    snippetElement.innerHTML = `
      <div class="code-snippet-header">
        <h5 class="mb-2">
          <i class="fas fa-code"></i> ${snippet.title}
        </h5>
        <p class="text-muted mb-3">${snippet.description}</p>
      </div>
      <div class="code-snippet-body">
        <div class="code-toolbar">
          <span class="language-badge badge badge-cyan">${snippet.language.toUpperCase()}</span>
          <button class="btn btn-sm btn-outline-light copy-btn" onclick="copyCode(${index})">
            <i class="fas fa-copy"></i> Copy
          </button>
        </div>
        <pre class="line-numbers"><code class="language-${
          snippet.language
        }">${this.escapeHtml(snippet.code)}</code></pre>
      </div>
    `;

    return snippetElement;
  }

  // Escape HTML for code display
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Show error message
  showError(message) {
    const container = document.querySelector(".container");
    container.innerHTML = `
      <div class="text-center mt-5">
        <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
        <h2 class="mt-3">Error</h2>
        <p class="text-muted">${message}</p>
        <a href="index.html" class="btn btn-primary">Back to Home</a>
      </div>
    `;
  }
}

// Copy code function
function copyCode(index) {
  const codeElement = document.querySelectorAll(".code-snippet pre code")[
    index
  ];
  const text = codeElement.textContent;

  navigator.clipboard.writeText(text).then(() => {
    // Show success feedback
    const button = document.querySelectorAll(".copy-btn")[index];
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.add("btn-success");
    button.classList.remove("btn-outline-light");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("btn-success");
      button.classList.add("btn-outline-light");
    }, 2000);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const experienceManager = new ExperienceDetailsManager();
  experienceManager.init();
});
