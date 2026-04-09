---
name: git-auto
description: >
  Automates Claude Code's git workflow with auto-accepted permissions, smart git operations,
  and a self-improving feedback loop that logs every git session, reviews what happened, and
  suggests improvements to both the skill and the user's workflow.
  Use this skill whenever the user wants to: set up git auto-accept in Claude Code, configure
  Claude Code permissions for git, automate git commits, automate git push, create branches
  automatically, auto-create pull requests, streamline their git workflow, review git logs,
  improve their git process, or mentions anything about "auto accept", "skip permissions",
  "git automation", "auto commit", "auto push", "auto PR", "git workflow", "git review",
  or "improve my git process". Also trigger when the user says things like "make git easier",
  "stop asking me about git", "just commit it", "push it up", "make a PR", "set up my git",
  "what happened with git", "review my git activity", or "how can I git better".
  Even casual mentions like "git stuff" or "handle the git" should trigger this skill.
---

# Git Auto — Self-Improving Claude Code Git Automation

This skill has three jobs:
1. **Configure** Claude Code to auto-approve git commands (no more permission popups)
2. **Automate** smart git workflows (commits, branches, pushes, PRs)
3. **Learn** by logging every git session, reviewing outcomes, and suggesting improvements

---

## Part 1: Setting Up Auto-Accept for Git Commands

Claude Code has a permission system that asks you to approve every shell command. For git
operations you trust, you can tell it to auto-approve them.

### Quick Setup (Recommended)

Create or edit `~/.claude/settings.json` (applies to ALL your projects):

```json
{
  "permissions": {
    "allow": [
      "Bash(git status *)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git push *)",
      "Bash(git pull *)",
      "Bash(git checkout *)",
      "Bash(git switch *)",
      "Bash(git branch *)",
      "Bash(git merge *)",
      "Bash(git fetch *)",
      "Bash(git stash *)",
      "Bash(git rebase *)",
      "Bash(git tag *)",
      "Bash(git remote *)",
      "Bash(git cherry-pick *)",
      "Bash(gh *)"
    ]
  }
}
```

### Safety-First Setup

Auto-accept most commands but still get asked before destructive operations:

```json
{
  "permissions": {
    "deny": [
      "Bash(git push --force *)",
      "Bash(git push -f *)",
      "Bash(git reset --hard *)",
      "Bash(git clean -f *)"
    ],
    "ask": [
      "Bash(git rebase *)",
      "Bash(git push * main)",
      "Bash(git push * master)",
      "Bash(git push * prod)"
    ],
    "allow": [
      "Bash(git *)",
      "Bash(gh *)"
    ]
  }
}
```

Rules evaluate in order: deny → ask → allow. Destructive commands blocked, pushes to
main/master/prod require confirmation, everything else auto-approved.

### Project-Level Setup

Per-project settings in `.claude/settings.json` at the project root (committed to repo):

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(gh *)"
    ]
  }
}
```

For personal overrides that don't get committed: `.claude/settings.local.json`.

### Nuclear Option

Skip all permissions everywhere (only use in VMs/containers/CI):

```bash
claude --dangerously-skip-permissions
```

---

## Part 2: Automated Git Workflow

When handling git operations, follow these smart defaults. Be helpful and proactive
without being reckless.

### Smart Commits

1. **Stage intelligently** — `git add` specific files, never `git add -A`.
   Never stage `.env`, credentials, or large binaries unless explicitly asked.
2. **Write good commit messages** — conventional commits format:
   - `feat:` new features | `fix:` bug fixes | `refactor:` refactoring
   - `docs:` documentation | `style:` formatting | `test:` tests | `chore:` maintenance
3. **Check before committing** — always run `git status` and `git diff --staged` first.
4. **Match the project's style** — run `git log --oneline -10` and follow existing conventions.

### Branch Management

1. **Naming**: `type/short-description` (e.g., `feature/add-auth`, `fix/login-redirect`)
2. **Branch from fresh main**: `git fetch origin && git checkout -b feature/x origin/main`
3. **Check if branch exists** before creating a new one.

### Auto Push

1. **Set upstream on first push**: `git push -u origin branch-name`
2. **Pull before push** if branch exists on remote
3. **Never force push** to main/master/prod — tell the user about conflicts

### Pull Request Creation

Use GitHub CLI (`gh`) with structured descriptions:

```bash
gh pr create --title "feat: add JWT authentication" --body "$(cat <<'EOF'
## Summary
- What changed and why

## Test plan
- [ ] How to verify the changes work
EOF
)"
```

### Full Workflow ("ship it" mode)

When user says "commit and push" or "ship it":
1. `git status` → `git diff` → `git log --oneline -5`
2. Stage relevant files (specific, not blanket)
3. Commit with descriptive message
4. Push to remote (create branch if needed)
5. Create PR if on a feature branch
6. **Log the session** (see Part 3)

### Safety Rails

- Never commit secrets, `.env`, or credentials
- Never force push to shared branches
- Never rebase shared branches without permission
- Never delete remote branches without asking
- Never amend already-pushed commits
- On pre-commit hook failure: fix the issue, create a NEW commit (never --amend)

---

## Part 3: Git Session Logging & Self-Improvement

This is what makes the skill get smarter over time. Every git session gets logged,
periodically reviewed, and the insights feed back into improving both the skill and
the user's workflow.

### Session Logging

After every git workflow (commit, push, PR, branch operation, or any multi-step git
task), append a session entry to the git log file at `.claude/git-auto-log.json`.

Create the file if it doesn't exist. Each entry captures what happened, what went
well, and what could be better.

**Log entry structure:**

```json
{
  "sessions": [
    {
      "id": "session-2026-04-09-001",
      "timestamp": "2026-04-09T14:32:00Z",
      "project": "project-name-from-pwd",
      "operations": [
        {
          "command": "git add src/auth.js src/auth.test.js",
          "intent": "Stage auth feature files",
          "result": "success",
          "notes": null
        },
        {
          "command": "git commit -m \"feat: add JWT authentication\"",
          "intent": "Commit auth feature",
          "result": "success",
          "notes": null
        },
        {
          "command": "git push -u origin feature/add-auth",
          "intent": "Push new feature branch",
          "result": "success",
          "notes": "First push, set upstream"
        }
      ],
      "workflow_type": "commit-push",
      "files_touched": ["src/auth.js", "src/auth.test.js"],
      "branch": "feature/add-auth",
      "outcome": "success",
      "issues_encountered": [],
      "time_estimate_seconds": 15,
      "improvements_noted": []
    }
  ]
}
```

**What to capture for each session:**
- Every git command run (the actual command string)
- The intent behind each command (why you ran it)
- The result (success, failure, conflict, warning)
- Any issues encountered (merge conflicts, hook failures, permission errors)
- The overall workflow type (commit, commit-push, branch-create, pr-create, full-ship, conflict-resolve)
- Files that were touched
- Any observations about things that could have gone better

**When something goes wrong, capture extra detail:**

```json
{
  "issues_encountered": [
    {
      "type": "pre-commit-hook-failure",
      "description": "ESLint found 3 errors in auth.js",
      "resolution": "Fixed lint errors, created new commit",
      "time_lost_seconds": 30,
      "preventable": true,
      "prevention_suggestion": "Run linter before staging files"
    }
  ]
}
```

### Session Review

Periodically (or when the user asks "review my git activity" / "how's my git workflow"),
read the log file and produce a review. The review should cover:

**1. Pattern Analysis**
- What workflow types are most common?
- Which files/directories get committed together frequently? (These might be good
  candidates for a single logical unit or a git alias.)
- Are commits typically small and focused, or large and sprawling?
- What branches get created and how long do they live?

**2. Issue Tracking**
- What errors keep recurring? (e.g., lint failures, merge conflicts in specific files)
- Are there patterns in what goes wrong? (e.g., always conflicts in `package-lock.json`)
- How much time is being lost to preventable issues?

**3. Workflow Scoring**

Rate the recent git workflow on these dimensions (1-5 scale):

| Dimension | What it measures |
|-----------|-----------------|
| **Commit hygiene** | Are commits small, focused, well-named? |
| **Branch discipline** | Good naming, short-lived feature branches, clean merges? |
| **Safety** | No force pushes, no secrets committed, no destructive ops? |
| **Efficiency** | Minimal wasted steps, good use of automation? |
| **Collaboration** | Good PR descriptions, linked issues, reviewers assigned? |

**4. Generate the review report**

Write the review to `.claude/git-auto-review.md` so the user can reference it later:

```markdown
# Git Workflow Review — [Date Range]

## Summary
[2-3 sentences on overall health of the git workflow]

## Stats
- Total sessions: X
- Success rate: X%
- Most common workflow: commit-push (X times)
- Average operations per session: X
- Issues encountered: X (Y preventable)

## Patterns Observed
[What the log data reveals about how the user works]

## Top Issues
[Recurring problems and their frequency]

## Recommendations
[Specific, actionable suggestions — see below]

## Skill Improvement Suggestions
[Changes to THIS skill that would make future sessions smoother]
```

### Generating Improvement Suggestions

This is the self-improving part. Based on the log review, generate two types of
suggestions:

**Type 1: Workflow suggestions for the user**

These are things the user could do differently. Be specific and practical:

- "You've had lint failures in 4 of your last 10 commits. Consider adding a
  pre-stage lint check to your workflow — I can run the linter before staging files."
- "Files `api/routes.js` and `api/middleware.js` always get committed together.
  You might want a git alias or I can auto-stage both when one changes."
- "Your feature branches average 12 days before merge. Shorter-lived branches
  (3-5 days) reduce merge conflict risk."
- "You've pushed directly to main 3 times this week. Consider using feature branches
  for all changes."

**Type 2: Skill self-improvement suggestions**

These are changes to THIS SKILL that would make it work better. Write these as
concrete diffs or additions to the SKILL.md:

- "Add a pre-commit linting step to the Smart Commits workflow since the user's
  project uses ESLint and failures are common."
- "Add a `package-lock.json` conflict resolution shortcut since this file causes
  80% of merge conflicts in this project."
- "The PR template should include a 'Breaking Changes' section since this project
  has downstream consumers."
- "Add auto-detection for monorepo structure since this project has multiple
  packages and commits should be scoped."

Save skill improvement suggestions to `.claude/git-auto-improvements.json`:

```json
{
  "suggestions": [
    {
      "id": "suggestion-001",
      "date": "2026-04-09",
      "type": "skill-improvement",
      "priority": "high",
      "title": "Add pre-commit lint check",
      "description": "Run project linter before staging files to catch errors early",
      "evidence": "4 of last 10 commits had lint failures that required re-commits",
      "proposed_change": "Add a step to Smart Commits: before staging, run the project's lint command and fix any issues",
      "status": "pending"
    }
  ],
  "applied": []
}
```

### Applying Improvements

When the user says "apply git improvements" or "update the git skill":

1. Read `.claude/git-auto-improvements.json`
2. Present the pending suggestions with their evidence
3. Ask which ones to apply
4. For approved suggestions, update the SKILL.md directly
5. Move applied suggestions from `suggestions` to `applied` with a timestamp
6. Log the change

This creates a feedback loop: use git → log it → review it → improve the skill →
use git better → repeat.

### Auto-Review Triggers

Suggest a review automatically when:
- 20+ sessions have accumulated since the last review
- 5+ issues have been logged since the last review
- The user starts a new session and it's been more than 2 weeks since the last review
- The user explicitly asks ("review my git", "how's my workflow", "any git suggestions")
