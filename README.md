# SmartMerge
Your git cli's best friend.

[![Socket Badge](https://badge.socket.dev/npm/package/smart-merge-cli/latest)](https://badge.socket.dev/npm/package/smart-merge-cli/latest)
![NPM Version](https://img.shields.io/npm/v/smart-merge-cli)



## About
SmartMerge was made from the utter frustration of git merge errors. It is designed to help tracking down those pesky merge errors. It also has a `--json` flag that sends the output to machine readable output. And, it even comes with the `--no-color` flag for no reason at all.

## Usage
To use it, Well you will have to really screw up your local git repository so much that rebase says `CONFLICT: ` or something. The SmartMerger can help you in this situation by telling you allmost all the info that git dosen't tell you. Because git is a tortuous and insuferable, No. I didn't say that. But anyway, SmartMerger allows you to see commits that are related to the file on your current branch, see an explaination for the curse git gave you and the repo status. Batterys included

## Commands
`
smartmerge check .
`
This runs the checker in the local repo to find any conflicts and tell you the files they are in.

`
smartmerge status .
`
This command shows you the glorified git status.

`
smartmerge explain .
`
Tells you what is wrong and how to fix it

`
smartmerge history .
`
Shows you where it all went wrong.

## Keynote

Git created the problem.
 SmartMerge helps explain it.

Built by one f***ed off developer
 For everyone who's ever stared at CONFLICT (content) and wondered what on earth Git was on about.

## Troubleshooting

### `smartmerge` command not found

If you installed Smart Merge globally:

```bash
npm install -g smart-merge-cli
```

but receive:

```text
'smartmerge' is not recognized as an internal or external command
```

or:

```powershell
Get-Command smartmerge
```

cannot find the command, ensure your npm global bin directory is on your PATH.

Check npm's global prefix:

```bash
npm config get prefix
```

Typical Windows output:

```text
C:\Users\<username>\AppData\Roaming\npm
```

Add this directory to your user PATH and restart your terminal.

Verify:

```powershell
where smartmerge
```

Expected output:

```text
C:\Users\<username>\AppData\Roaming\npm\smartmerge.cmd
```

Then test:

```powershell
smartmerge --help
```

### Run without installing

Use npx to run Smart Merge directly:

```bash
npx smart-merge-cli --help
```

Example:

```bash
npx smart-merge-cli check my-repo
```

### Verify installation

Display the CLI help:

```bash
smartmerge --help
```

Expected output:

```text
Usage: SmartMerger [options] [command]
```
