#!/usr/bin/env node
import { program } from "commander";
import searchCommand from "./commands/search2.js";
import downloadCommand from "./commands/download.js";

program.version("1.0.0").description("A manga downloader CLI for visortmo");

searchCommand(program);
downloadCommand(program);

program.parse(process.argv);
