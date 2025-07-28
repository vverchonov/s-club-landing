# Environment Variables Configuration

This document describes all the environment variables required to run the Cherry Lips booking system.

## 📁 Environment File Setup

Create a `.env.local` file in the root directory of the project:

```bash
# Copy the example file
cp .env.example .env.local

# Or create it manually
touch .env.local
```

## 🔧 Required Environment Variables

### 1. MongoDB Configuration

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/cherry-lips
```

**Description**: Connection string for MongoDB database.

**Options**:
- **Local Development**: `mongodb://localhost:27017/cherry-lips`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/cherry-lips?retryWrites=true&w=majority`
- **Docker**: `mongodb://mongo:27017/cherry-lips`

**Required**: ✅ Yes

---

### 2. Email Configuration (for Contact Form)

```env
# Email Service Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

**Description**: SMTP configuration for sending contact form emails.

**Options**:
- **Gmail**: Use Gmail SMTP with App Password
- **Outlook**: `smtp-mail.outlook.com`
- **Custom SMTP**: Your own SMTP server

**Required**: ✅ Yes (for contact form functionality)

---

### 3. Next.js Configuration

```env
# Next.js Environment
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Description**: Next.js specific configuration.

**Options**:
- **Development**: `NODE_ENV=development`
- **Production**: `NODE_ENV=production`
- **Site URL**: Your domain in production

**Required**: ⚠️ Optional (Next.js will use defaults)

---

## 🚀 Environment Setup Examples

### Development Setup

```env
# .env.local
MONGODB_URI=mongodb://localhost:27017/cherry-lips
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-dev-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=your-dev-email@gmail.com
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production Setup

```env
# .env.local
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cherry-lips?retryWrites=true&w=majority
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
EMAIL_FROM=your-production-email@gmail.com
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Docker Setup

```env
# .env.local
MONGODB_URI=mongodb://mongo:27017/cherry-lips
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🔐 Security Best Practices

### 1. Never Commit Environment Files
```bash
# .gitignore should include:
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 2. Use Strong Passwords
- Use App Passwords for Gmail (not regular passwords)
- Use strong MongoDB passwords
- Rotate credentials regularly

### 3. Environment-Specific Files
```bash
.env.local          # Local development (gitignored)
.env.production     # Production settings
.env.staging        # Staging settings
```

## 🛠 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

### 3. Configure Variables
Edit `.env.local` with your actual values.

### 4. Start Development Server
```bash
npm run dev
```

### 5. Verify Setup
- Visit `http://localhost:3000`
- Test contact form
- Test booking form at `/book`

## 🔍 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh --eval "db.runCommand('ping')"

# Test connection string
mongosh "your-connection-string"
```

### Email Configuration Issues
```bash
# Test SMTP connection
npm run test:email

# Check Gmail App Password setup
# 1. Enable 2FA on Gmail
# 2. Generate App Password
# 3. Use App Password in EMAIL_PASS
```

### Environment Variable Not Loading
```bash
# Restart development server
npm run dev

# Check variable names (case-sensitive)
echo $MONGODB_URI

# Verify .env.local location (root directory)
ls -la .env.local
```

## 📋 Environment Checklist

Before running the project, ensure you have:

- [ ] Created `.env.local` file
- [ ] Set `MONGODB_URI` with valid connection string
- [ ] Configured email settings for contact form
- [ ] Set appropriate `NODE_ENV`
- [ ] Verified all variables are correctly named
- [ ] Tested MongoDB connection
- [ ] Tested email functionality

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check email service configuration
5. Review Next.js logs for detailed error messages

## 📚 Additional Resources

- [MongoDB Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [SMTP Configuration Guide](https://nodemailer.com/smtp/) 